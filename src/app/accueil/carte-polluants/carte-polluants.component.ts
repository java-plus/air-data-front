import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { CarteService } from 'src/app/services/carte.service';

@Component({
  selector: 'app-carte-polluants',
  templateUrl: './carte-polluants.component.html',
  styleUrls: ['./carte-polluants.component.scss']
})
export class CartePolluantsComponent implements OnInit {

  constructor(private http: HttpClient, private carteService: CarteService, ) { }
  myfrugalmap: L.Map;

  ngOnInit() {
    this.initMap("so2")
  }

  initMap(polluant: string) {

    if (localStorage.getItem("polluants")) {
      this.initMapAvecCache(polluant);
    }else{

      this.initMapSansCache(polluant);
    }
  }



  initMapAvecCache(polluant: string) {
    console.log(polluant);
    let json=JSON.parse(localStorage.getItem("polluants"));
    if (this.myfrugalmap) {
      this.myfrugalmap.off();
      this.myfrugalmap.remove();
    }
    this.myfrugalmap = L.map('frugalmap').setView([47.4712, -0.3], 8);
    L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(this.myfrugalmap);

    const determinerSeuils = this.determinerSeuils;
    const determinerVerif = this.determinerVerif;

    // chargement du fichiers communes.json pour créer le périmètre des communes


      let geojson;
      geojson = L.geoJSON(json, {
        style: function (feature) {
          let seuils: number[] = determinerSeuils(polluant);
          let verif: number = determinerVerif(feature,polluant);

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
            return { weight: 1, opacity: 0.1, dashArray: '3', color: "white", fillColor: "grey", fillOpacity: 0.5 }
          }
        },
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

      }).addTo(this.myfrugalmap);



    function highlightFeature() { };
    function resetHighlight() { };
    function zoomToFeature() { };
  }

  initMapSansCache(polluant: string) {
    console.log(polluant);
    if (this.myfrugalmap) {
      this.myfrugalmap.off();
      this.myfrugalmap.remove();
    }
    this.myfrugalmap = L.map('frugalmap').setView([47.4712, -0.3], 8);
    L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(this.myfrugalmap);

    const determinerSeuils = this.determinerSeuils;
    const determinerVerif = this.determinerVerif;

    // chargement du fichiers communes.json pour créer le périmètre des communes
    this.carteService.getGeoJsonBack().subscribe((json: any) => {
      localStorage.setItem("polluants", JSON.stringify(json));
      let geojson;
      geojson = L.geoJSON(json, {
        style: function (feature) {
          let seuils: number[] = determinerSeuils(polluant);
          let verif: number = determinerVerif(feature,polluant);
console.log(verif);
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
        },
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

      }).addTo(this.myfrugalmap);

    });

    function highlightFeature() { };
    function resetHighlight() { };
    function zoomToFeature() { };
  }

  determinerVerif(feature,polluant:string): number {
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

  determinerSeuils(polluant): number[] {
    console.log(polluant);
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

}
