import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { CarteService } from 'src/app/services/carte.service';

/**
   * Cette interface représente l'échelle de pollution présente sur la carte et qui renseigne l'utilisateur sur la signification des couleurs pour chaque polluant
   */
interface SeuilPollution {
  seuil: string,
  couleur: string
};


/**
   * Classe CartePolluantsComponent représentant la carte couleur des polluants et l'url http://localhost:8080/communes/geojson
   */
@Component({
  selector: 'app-carte-polluants',
  templateUrl: './carte-polluants.component.html',
  styleUrls: ['./carte-polluants.component.scss']
})
export class CartePolluantsComponent implements OnInit {


  constructor(private http: HttpClient, private carteService: CarteService, ) { }

  /**
   * Cette variable rerprésente la map, elle même créé via la commande this.myfrugalmap = L.map('frugalmap').setView([47.4712, -0.3], 8)
   * On a besoin de créer cette variable pour pouvoir la réinitialiser afin de créer une nouvelle carte avec un nouveau polluant.
   */
  myfrugalmap: L.Map;

  /**
   * Cette variable rerprésente l'initialisation de l'echelle de pollution. En effet lors du chargement du composant c'est le polluant PM10 qui est affiché par défaut.
   * On initialise donc listeDesSeuilsDePollution pour afficher la bonne echelle.
   */
  listeDesSeuilsDePollution: SeuilPollution[] = this.determinerTableauDesSeuils("pm10");

  /**
   * Au chargement du composant, on initialise la map (via initMap()) avec le polluant PM10
   */
  ngOnInit() {
    this.initMap("pm10")
  }

  /**
   * Cette methode permet de retrouver les valeurs de pollution par commune mises en cache si elles existent et qu'elle datent de moins d'une heure.
   * Sinon elle renvoie le string "pas de localStorage"
   */
  retrouverLocalStorageDesPolluants(): string {


    if (localStorage.length > 0) {
      for (let index = 0; index < localStorage.length; index++) {
        if (localStorage.key(index).startsWith("polluants")) {
          let tempsDepuisStorage: number = Date.now() - (+localStorage.key(index).replace("polluants", ""));
          if (tempsDepuisStorage < 3600000) {
            let key = localStorage.key(index);
            let value = localStorage.getItem(key)
            return value
          }
        }
      }
      return "pas de localStorage"

    } else {
      return "pas de localStorage"
    }
  }

  /**
     * Cette methode permet
     * _d'initialiser la variable this.listeDesSeuilsDePollution qui permet d'afficher correctement la légende.
     * _de choisir entre l'utilisation des données de pollution par commune en cache ou l'appel du front pour charger les données
     */
  initMap(polluant: string) {

    this.listeDesSeuilsDePollution = this.determinerTableauDesSeuils(polluant);


    if (this.retrouverLocalStorageDesPolluants() != "pas de localStorage") {
      this.initMapAvecCache(polluant);
    } else {

      this.initMapSansCache(polluant);
    }
  }


  /**
     * Cette methode initialise la map et n'est appelée que si les données de pollution par commune sont présentes en cache
     *
     */
  initMapAvecCache(polluant: string) {

    let json = JSON.parse(this.retrouverLocalStorageDesPolluants());
    if (this.myfrugalmap) {
      this.myfrugalmap.off();
      this.myfrugalmap.remove();
    }
    this.myfrugalmap = L.map('frugalmap').setView([47.4712, -0.3], 8);
    L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(this.myfrugalmap);


    const determinerStyle = this.determinerStyle;

    let geojson;
    let determinerSeuils=this.determinerSeuils;
    let determinerVerif=this.determinerVerif;
    geojson = L.geoJSON(json, {
      style: function (feature) {
        let seuils: number[] = determinerSeuils(polluant);
    let verif: number = determinerVerif(feature, polluant);
          let retour=determinerStyle(seuils, verif);
        return retour;
      }
    }).addTo(this.myfrugalmap);

  }

    /**
     * Cette methode initialise la map et n'est appelée que si les données de pollution par commune ne sont pas présentes en cache
     *
     */
  initMapSansCache(polluant: string) {

    if (this.myfrugalmap) {
      this.myfrugalmap.off();
      this.myfrugalmap.remove();
    }
    this.myfrugalmap = L.map('frugalmap').setView([47.4712, -0.3], 8);
    L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(this.myfrugalmap);


    const determinerStyle = this.determinerStyle;

    // chargement du fichiers communes.json pour créer le périmètre des communes
    this.carteService.getGeoJsonBack().subscribe((json: any) => {
      let date: number = Date.now();
      let nomStorage: string = "polluants" + date;
      localStorage.setItem(nomStorage, JSON.stringify(json));
      let geojson;
      let determinerSeuils=this.determinerSeuils;
    let determinerVerif=this.determinerVerif;
      geojson = L.geoJSON(json, {
        style: function (feature) {
          let seuils: number[] = determinerSeuils(polluant);
          let verif: number = determinerVerif(feature, polluant);
                let retour=determinerStyle(seuils, verif);
              return retour;
        }

      }).addTo(this.myfrugalmap);

    });

  }

  /**
     * Cette methode determine la couleur de chaque commune en fonction du taux de pollution du polluant concerné et en fonction des seuils de pollutions concernés
     * Elle prend en paramètres les "seuils" et les "verif" qui sont determinés via les méthodes de la même classe determinerVerif(feature, polluant: string)
     * et determinerSeuils(polluant)
     *
     */
  determinerStyle(seuils, verif) {
    if (verif > seuils[3]) {
      return { weight: 1, opacity: 0.1, dashArray: '3', color: "white", fillColor: "#8A2BE2", fillOpacity: 0.5 }
    }
    if (verif > seuils[2]) {
      return { weight: 1, opacity: 0.1, dashArray: '3', color: "white", fillColor: "red", fillOpacity: 0.5 }
    }
    else if (verif > seuils[1]) {
      return { weight: 1, opacity: 0.1, dashArray: '3', color: "white", fillColor: "yellow", fillOpacity: 0.5 }
    }
    else if (verif > seuils[0]) {
      return { weight: 1, opacity: 0.1, dashArray: '3', color: "white", fillColor: "orange", fillOpacity: 0.5 }
    }
    else if (verif > 0) {
      return { weight: 1, opacity: 0.1, dashArray: '3', color: "white", fillColor: "green", fillOpacity: 0.5 }
    }
    else if (verif <= 0) {
      return { weight: 1, opacity: 0.1, dashArray: '3', color: "white", fillColor: "white", fillOpacity: 0.5 }
    }
  }

/**
     * Cette methode determine le taux de pollution à prendre en compte dans la map. Elle extraie une valeur de pollution du geoJson en fonction du polluant demandé
     *
     */
  determinerVerif(feature, polluant: string): number {
    switch (polluant) {
      case "so2":
        return Number(feature.properties.so2);
        break;
      case "pm10":
        return Number(feature.properties.pm10);
        break;
      case "pm25":
        return Number(feature.properties.pm25);
        break;
      case "co":
        return Number(feature.properties.co);
        break;
      case "o3":
        return Number(feature.properties.o3);
        break;
      case "no2":
        return Number(feature.properties.no2);
        break;
      default:
        break;
    }

  }

  /**
     * Cette methode determine les seuils des taux de pollutions à prendre en compte en fonction du polluant. exemple: si le polluant est PM10, une très forte pollution
     * équivalente à la couleur violette sur la carte correspond à un taux de pollution supérieur à 60 microgramme/m3, une forte pollution équivalente à la couleur rouge sur la carte correspond à un taux de pollution supérieur à 45 microgramme/m3
     *
     */
  determinerSeuils(polluant): number[] {

    switch (polluant) {
      case "so2":
        return [100, 200, 350, 500]
        break;
      case "pm10":
        return [15, 30, 45, 60]
        break;
      case "pm25":
        return [15, 30, 45, 90]
        break;
      case "co":
        return [5, 10, 25, 50]
        break;
      case "o3":
        return [80, 120, 180, 240]
        break;
      case "no2":
        return [40, 100, 200, 400]
        break;
      default:
        break;
    }
  }

  /**
     * Cette methode permet de créer la visualisation de l'échelle de pollution sur le front. exemple: si le polluant est PM10, une très forte pollution
     * équivalente à la couleur violette sur la carte correspond à la phrase "de 60 μg à l'infini"
     */
  determinerTableauDesSeuils(polluant: string): SeuilPollution[] {
    let tableauDesSeuils: number[] = this.determinerSeuils(polluant);
    return [
      {
        "seuil": `De ${tableauDesSeuils[3]} μg à l'infini`,
        "couleur": "#8A2BE2"
      },
      {
        "seuil": `De ${tableauDesSeuils[2]} à ${tableauDesSeuils[3]} μg`,
        "couleur": "red"
      },
      {
        "seuil": `De ${tableauDesSeuils[1]} à ${tableauDesSeuils[2]} μg`,
        "couleur": "orange"
      },
      {
        "seuil": `De ${tableauDesSeuils[0]} à ${tableauDesSeuils[1]} μg`,
        "couleur": "yellow"
      },
      {
        "seuil": `De 0 à ${tableauDesSeuils[0]} μg`,
        "couleur": "green"
      },
      {
        "seuil": `valeur incorrect ou absente`,
        "couleur": "white"
      }
    ];
  }

}
