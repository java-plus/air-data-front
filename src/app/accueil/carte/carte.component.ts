import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CarteService } from '../../services/carte.service';
import { MesurePollution } from '../../model/MesurePollution';
import StationDeMesurePollution from '../../model/StationDeMesurePollution';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import Utilisateur from 'src/app/model/Utilisateur';
import Favori from 'src/app/model/Favori';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FavorisService } from 'src/app/services/favoris.service';



type MesuresPollutionParStationDeMesure = Array<{
  stationDeMesurePollution: StationDeMesurePollution,
  listeDeMesurePollutionParStationDeMesure: MesurePollution[]
}>;

type BoondZoom = {
  southWest: _southWest,
  northEast: _northEast
};
type _southWest = { southLat: number, westLng: number };
type _northEast = { northLat: number, eastLng: number };


//Class CarteComponent représentant le composant "Carte" du front
@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnInit {




  /**
   * abonnement au subject contenant l'utilisateur connecté
   */
  userConnectSub: Subscription;
  /**
   * abonnement au subject contenant le favori selectionné
   */
  favoriSelectSub: Subscription;
  /**
   * l'utilisateur connecté
   */
  userConnecte: Utilisateur = undefined;

  /**
   * le favori selectionné
   */
  favoriSelection: Favori = undefined;

  /**
   * l'objet map créé dans le ngOnInit
   */
  myFrugalMapLocal;

  /**
   * l'objet geoJson créé dans le ngOnInit
   */
  geoJson;

  /**
   * l'objet groupe (de layers) créé dans le ngOnInit
   */
  groupLocal;

  constructor(private favoriService: FavorisService, private authService: AuthServiceService, private carteService: CarteService, private http: HttpClient) { }

  // Lors de l'initialisation du composant la carte ainsi que tous ce qui la compose est créé:
  // _ marqueurs : sont créés si l'utilisateur clique sur une commune de la carte. Les marqueurs qui appparaissent sont ceux correspondant aux stations de mesures polutions de la BDD
  //               Leur position est déterminé selon la liste de 6 mesures pollution correspondant à une commune dans la BDD (NO2, SO2, PM10...). La fonction calcule les n stations de mesures corresponndantes.
  //  périmètres de communes: chargés à partir du fichier "communes.json" présents dans le dossier ./air-data-front/src/assets
  ngOnInit() {

    this.userConnectSub = this.authService.subConnecte.subscribe(
      (userConnecte) => {
        this.userConnecte = userConnecte;

      }
    );
    this.favoriSelectSub = this.favoriService.subFavoriSelect.subscribe(
      (favori) => {
        this.favoriSelection = favori;
        if (this.favoriSelection) {
          let codeCommune = this.favoriSelection.commune.codeCommune;
          let latitude = this.favoriSelection.commune.latitude;
          let longitude = this.favoriSelection.commune.longitude;
          this.clickSurMap(codeCommune, {
            originalEvent: MouseEvent,
            latlng: { lat: latitude, lng: longitude },
            type: "click"
          });
        }
      }, (error) => console.log(error)
    );

    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const myfrugalmap = L.map('frugalmap').setView([47.4712, -0.3], 8);
    this.myFrugalMapLocal = myfrugalmap;
    const group = L.featureGroup().addTo(myfrugalmap);
    this.groupLocal = group;

    L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(myfrugalmap);

    // chargement du fichiers communes.json pour créer le périmètre des communes
    this.http.get('assets/communes.json').subscribe((json: any) => {
      json;
      let geojson;
      let info;

      // création de la variable info qui permettra de créer une fenetre informant l'utilisateur sur la commune qu'il survole avec sa sourie
      info = new L.Control();
      info.onAdd = function (myfrugalmap) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
      };
      info.update = function (props) {
        this._div.innerHTML = '<h4>' + (props ? '<b>' + props.nom + '</b><br />'
          : 'Hover over a state');
      };
      info.addTo(myfrugalmap);

      // couleur du périmètre et de l'intérieur des communes
      geojson = L.geoJSON(json, {
        style: {
          fillColor: 'grey',
          weight: 5,
          opacity: 0.1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.1
        }
        ,
        // Comportement de la carte devant les événements
        // "survol de la sourie d'une commune" => highlightFeature,
        // "sortie de la sourie d'une commune"=> resetHighlight
        // "clic de la sourie sur une commune"=> zoomToFeature
        onEachFeature: function onEachFeature(feature, layer) {
          layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
          });
        }
      }).addTo(myfrugalmap);

      this.geoJson = geojson;

      //fonction activée au survol de la sourie d'une commune
      function highlightFeature(e) {
        let layer = e.target;
        layer.setStyle({
          weight: 1,
          color: 'red',
          dashArray: '',
          fillOpacity: 0.9
        });
        if (!L.Browser.ie && !L.Browser.edge) {
          layer.bringToFront();
        }
        info.update(layer.feature.properties);
      }


      let carteService = this.carteService;
      let nomCommune;

      //fonction activée à la sortie de la sourie d'une commune
      function resetHighlight(e) {
        if (group.getLayerId(e.target)==carteService.getIdLayerEnregistre()){
        } else {
          geojson.resetStyle(e.target);
          info.update();
        }
      }

      let obtenirLaListeDesObjetsMesuresPollutionParStationDeMesure = this.obtenirLaListeDesObjetsMesuresPollutionParStationDeMesure;
      let placerLesMarqueurs = this.placerLesMarqueurs;
      let obtenirBoondPourZoom = this.obtenirBoondPourZoom;

      //fonction activée au clic de la sourie sur une commune
      function zoomToFeature(e) {
        myfrugalmap.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            myfrugalmap.removeLayer(layer);
          }
          if (group.getLayerId(layer) == carteService.getIdLayerEnregistre()) {
            geojson.resetStyle(layer)
          }
        });

        carteService.setIdLayerEnregistre(e.target._leaflet_id)
        nomCommune = e.target.feature.properties.nom;
        carteService.publierDansSubjectCommuneCourante(this.nomCommune);
        let listeObjetsMesuresPollutionParStationDeMesure: MesuresPollutionParStationDeMesure = [];
        this.codeCommune = e.target.feature.properties.code;

        carteService.recupererMesures(this.codeCommune).subscribe((data: MesurePollution[]) => {
          listeObjetsMesuresPollutionParStationDeMesure = obtenirLaListeDesObjetsMesuresPollutionParStationDeMesure(data);

          placerLesMarqueurs(listeObjetsMesuresPollutionParStationDeMesure, myfrugalmap);
          carteService.obtenirCoordonneeGpsCommune(this.codeCommune).subscribe((resp) => {
            let latCommune = resp[0].centre.coordinates[1];
            let lngCommune = resp[0].centre.coordinates[0];
            const boondPourZomm: number[] = obtenirBoondPourZoom(latCommune, lngCommune, data);
            myfrugalmap.fitBounds([[boondPourZomm[0], boondPourZomm[1]], [boondPourZomm[2], boondPourZomm[3]]]);

            carteService.publierDansSubjectMesuresMeteoCourante(this.codeCommune).subscribe(() => {
            },
              (error: HttpErrorResponse) => {
                console.log('error', error);
              })
          })
        }
          , (error: HttpErrorResponse) => {
            console.log('error', error);
          });
      }
    });
  }
  //------ fin du ngOnInit ---------//


  //fonction activée au clic de la sourie sur un favori
  clickSurMap(codeCommune: string, e) {
    this.myFrugalMapLocal.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.myFrugalMapLocal.removeLayer(layer);
      }
      if (this.groupLocal.getLayerId(layer) == this.carteService.getIdLayerEnregistre()) {
        this.geoJson.resetStyle(layer)
      }
    });
    this.myFrugalMapLocal.eachLayer((layer) => {
      if (this.groupLocal.getLayerId(layer)) {
        if (layer.feature) {
          if (layer.feature.properties.code == codeCommune) {
            this.carteService.setIdLayerEnregistre(this.groupLocal.getLayerId(layer));
            layer.setStyle({
              weight: 1,
              color: 'red',
              dashArray: '',
              fillOpacity: 0.9
            });
          }
        }
      }
    });
    let listeObjetsMesuresPollutionParStationDeMesure: MesuresPollutionParStationDeMesure = [];


    this.carteService.recupererMesures(codeCommune).subscribe((data: MesurePollution[]) => {
      listeObjetsMesuresPollutionParStationDeMesure = this.obtenirLaListeDesObjetsMesuresPollutionParStationDeMesure(data);
      this.placerLesMarqueurs(listeObjetsMesuresPollutionParStationDeMesure, this.myFrugalMapLocal);
      this.carteService.obtenirCoordonneeGpsCommune(codeCommune).subscribe((resp) => {
        let latCommune = resp[0].centre.coordinates[1];
        let lngCommune = resp[0].centre.coordinates[0];
        const boondPourZomm: number[] = this.obtenirBoondPourZoom(latCommune, lngCommune, data);
        this.myFrugalMapLocal.fitBounds([[boondPourZomm[0], boondPourZomm[1]], [boondPourZomm[2], boondPourZomm[3]]]);
        this.carteService.publierDansSubjectMesuresMeteoCourante(codeCommune).subscribe(() => {
        },
          (error: HttpErrorResponse) => {
            console.log('error', error);
          })
      })
    }
      , (error: HttpErrorResponse) => {
        console.log('error', error);
      });

  }

  //Cette fonction permet de determiner un cadre de "zoom" pour la carte au moment de la selection d'une commune
  obtenirBoondPourZoom(latCommune: number, lngCommune: number, listeDeMesurePollution: MesurePollution[]): number[] {

    let latMin: number = Number.MAX_VALUE;
    let latMax: number = -Number.MAX_VALUE;
    let lngMin: number = Number.MAX_VALUE;
    let lngMax: number = -Number.MAX_VALUE;

    for (const mesurePollution of listeDeMesurePollution) {
      if (mesurePollution.stationDeMesure.latitude < latMin) {
        latMin = mesurePollution.stationDeMesure.latitude;
      }
      if (mesurePollution.stationDeMesure.latitude > latMax) {
        latMax = mesurePollution.stationDeMesure.latitude;
      }
      if (mesurePollution.stationDeMesure.longitude < lngMin) {
        lngMin = mesurePollution.stationDeMesure.longitude;
      }
      if (mesurePollution.stationDeMesure.longitude > lngMax) {
        lngMax = mesurePollution.stationDeMesure.longitude;
      }
    }
    latCommune > latMax ? latMax = latCommune : latMax = latMax;
    latCommune < latMin ? latMin = latCommune : latMin = latMin;

    lngCommune > lngMax ? lngMax = lngCommune : lngMax = lngMax;
    lngCommune < lngMin ? lngMin = lngCommune : lngMin = lngMin;

    let reponse: number[] = [latMin, lngMax, latMax, lngMin];
    return reponse;

  };


  // Cette fonction permet retourne la liste des mesures de chaque station de mesure correspondant à une commune
  obtenirLaListeDesObjetsMesuresPollutionParStationDeMesure(listeDeMesurePollution: MesurePollution[]): MesuresPollutionParStationDeMesure {
    let listeObjetsMesuresPollutionParStationDeMesure: MesuresPollutionParStationDeMesure = [];
    for (const mesurePollution of listeDeMesurePollution) {
      let laStationDeMesureEstDejaEnregistre = false;
      for (const objetMesuresPollutionParStationDeMesure of listeObjetsMesuresPollutionParStationDeMesure) {
        if (objetMesuresPollutionParStationDeMesure.stationDeMesurePollution.id == mesurePollution.stationDeMesure.id) {
          laStationDeMesureEstDejaEnregistre = true;
          objetMesuresPollutionParStationDeMesure.listeDeMesurePollutionParStationDeMesure.push(mesurePollution)
        }
      }
      if (!laStationDeMesureEstDejaEnregistre) {
        listeObjetsMesuresPollutionParStationDeMesure.push(
          {
            stationDeMesurePollution: mesurePollution.stationDeMesure,
            listeDeMesurePollutionParStationDeMesure: [mesurePollution]
          }
        );
      }
    }
    return listeObjetsMesuresPollutionParStationDeMesure;
  }

  //Cette fonction place les marqueurs représentant les stations de mesures sur la carte
  placerLesMarqueurs(listeObjetsMesuresPollutionParStationDeMesure: MesuresPollutionParStationDeMesure, myfrugalmap: L.Map) {
    for (const objetMesuresPollutionParStationDeMesure of listeObjetsMesuresPollutionParStationDeMesure) {
      const myIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
        iconAnchor: [10, 30],
        iconSize: [20, 30]
      });
      let textePopUp: string = '';
      for (const mesurePollution of objetMesuresPollutionParStationDeMesure.listeDeMesurePollutionParStationDeMesure) {
        textePopUp = textePopUp + ` ${mesurePollution.typeDeDonnee} : ${mesurePollution.valeur} &#xb5;g/m&#179;--`
      }
      L.marker([objetMesuresPollutionParStationDeMesure.stationDeMesurePollution.latitude,
      objetMesuresPollutionParStationDeMesure.stationDeMesurePollution.longitude],
        { icon: myIcon }).bindPopup(textePopUp).addTo(myfrugalmap);
    }
  }

}
