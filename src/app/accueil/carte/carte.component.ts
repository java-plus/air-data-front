import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CarteService } from '../../services/carte.service';
import { MesurePollution } from '../../model/MesurePollution';
import StationDeMesurePollution from '../../model/StationDeMesurePollution';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';



type MesuresPollutionParStationDeMesure = Array<{
  stationDeMesurePollution: StationDeMesurePollution,
  listeDeMesurePollutionParStationDeMesure: MesurePollution[]
}>;

type BoondZoom = {
  southWest: _southWest,
  northEast: _northEast
};
type _southWest = { southLat: number, westLng: number };
type _northEast = {northLat: number, eastLng: number };


//Class CarteComponent représentant le composant "Carte" du front
@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnInit {


  codeCommune: string;
  nomCommune: string;
  listeDeMesurePollution: MesurePollution[];
  listeDeStationDeMesure: StationDeMesurePollution[];
  latitude: number;
  longitude: number;
  json: any;




  constructor(private carteService: CarteService, private http: HttpClient) { }

  // Lors de l'initialisation du composant la carte ainsi que tous ce qui la compose est créé:
  // _ marqueurs : sont créés si l'utilisateur clique sur une commune de la carte. Les marqueurs qui appparaissent sont ceux correspondant aux stations de mesures polutions de la BDD
  //               Leur position est déterminé selon la liste de 6 mesures pollution correspondant à une commune dans la BDD (NO2, SO2, PM10...). La fonction calcule les n stations de mesures corresponndantes.
  //  périmètres de communes: chargés à partir du fichier "communes.json" présents dans le dossier ./air-data-front/src/assets
  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const myfrugalmap = L.map('frugalmap').setView([47.4712, -0.3], 8);

    L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(myfrugalmap);

    // chargement du fichiers communes.json pour créer le périmètre des communes
    this.http.get('assets/communes.json').subscribe((json: any) => {
      this.json = json;
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
        this._div.innerHTML = '<h4>' + (props ? 'rhh':  '--' ) + '</h4>';
      };

      info.addTo(myfrugalmap);

      // couleur du périmètre et de l'intérieur des communes
      geojson = L.geoJSON(this.json, {
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

      //fonction activée au survol de la sourie d'une commune
      function highlightFeature(e) {
        var layer = e.target;
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

      //fonction activée à la sortie de la sourie d'une commune
      function resetHighlight(e) {
            geojson.resetStyle(e.target); info.update();
      }



      let carteService = this.carteService;
      let obtenirLaListeDesObjetsMesuresPollutionParStationDeMesure = this.obtenirLaListeDesObjetsMesuresPollutionParStationDeMesure;
      let placerLesMarqueurs = this.placerLesMarqueurs;
      let obtenirBoondPourZoom = this.obtenirBoondPourZoom;

      //fonction activée au clic de la sourie sur une commune
      function zoomToFeature(e) {

        this.nomCommune = e.target.feature.properties.nom;

        carteService.publierDansSubjectCommuneCourante(this.nomCommune);

        let listeObjetsMesuresPollutionParStationDeMesure: MesuresPollutionParStationDeMesure = [];

        myfrugalmap.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            myfrugalmap.removeLayer(layer);
          }
        });




        this.codeCommune = e.target.feature.properties.code;

        carteService.recupererMesures(this.codeCommune).subscribe((data: MesurePollution[]) => {

          listeObjetsMesuresPollutionParStationDeMesure = obtenirLaListeDesObjetsMesuresPollutionParStationDeMesure(data);

          placerLesMarqueurs(listeObjetsMesuresPollutionParStationDeMesure, myfrugalmap);

          const boondPourZomm: number[] = obtenirBoondPourZoom(data)
          myfrugalmap.fitBounds([[boondPourZomm[0], boondPourZomm[1]],[boondPourZomm[2], boondPourZomm[3]]]);

          carteService.publierDansSubjectMesuresMeteoCourante(this.codeCommune).subscribe(() => {
          },
            (error: HttpErrorResponse) => {
              console.log('error', error);
            });
        }
          , (error: HttpErrorResponse) => {
            console.log('error', error);
          });

      }
    });
  }

  obtenirBoondPourZoom(listeDeMesurePollution: MesurePollution[]): number[] {
    let latMin: number = Number.MAX_VALUE;
    let latMax: number = Number.MIN_VALUE;
    let lngMin: number = Number.MAX_VALUE;
    let lngMax: number = Number.MIN_VALUE;
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
    let reponse:number[]=[latMin,lngMax,latMax,lngMin];


    return reponse;
  };


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

placerLesMarqueurs(listeObjetsMesuresPollutionParStationDeMesure: MesuresPollutionParStationDeMesure, myfrugalmap: L.Map) {
  for (const objetMesuresPollutionParStationDeMesure of listeObjetsMesuresPollutionParStationDeMesure) {
    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
      iconAnchor: [10, 30],
      iconSize: [20, 30]
    });
    let textePopUp: string = '';
    for (const mesurePollution of objetMesuresPollutionParStationDeMesure.listeDeMesurePollutionParStationDeMesure) {
      textePopUp = textePopUp + ` ${mesurePollution.typeDeDonnee} : ${mesurePollution.valeur} --`
    }
    L.marker([objetMesuresPollutionParStationDeMesure.stationDeMesurePollution.latitude,
    objetMesuresPollutionParStationDeMesure.stationDeMesurePollution.longitude],
      { icon: myIcon }).bindPopup(textePopUp).addTo(myfrugalmap);
  }
}

}
