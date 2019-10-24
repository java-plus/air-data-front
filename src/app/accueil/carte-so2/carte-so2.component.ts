import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { CarteService } from 'src/app/services/carte.service';

@Component({
  selector: 'app-carte-so2',
  templateUrl: './carte-so2.component.html',
  styleUrls: ['./carte-so2.component.scss']
})
export class CarteSo2Component implements OnInit{

  constructor(private http : HttpClient, private carteService: CarteService,) { }

  ngOnInit() {
    this.initMap("so2")
  }

  initMap(polluant:string){
    console.log("so2")
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const myfrugalmap = L.map('frugalmap').setView([47.4712, -0.3], 8);
    const group = L.featureGroup().addTo(myfrugalmap);

    L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(myfrugalmap);

    // chargement du fichiers communes.json pour créer le périmètre des communes
    this.carteService.getGeoJsonBack().subscribe((json: any) => {

      let geojson;
      geojson = L.geoJSON(json, {

          style: function(feature) {
            switch (polluant) {
              case "so2":
                var verif=Number(feature.properties.so2);
                var seuil4=500;
                var seuil3=350;
                var seuil2=200;
                var seuil1=100;
                break;
                case "pm10":
                var verif=Number(feature.properties.pm10);
                break;
              default:
                break;
            }

            if (verif > seuil4) {
              return {weight: 1,opacity: 0.1,dashArray: '3',color: "white", fillColor: "purple", fillOpacity: 0.5}
            }
            if (verif > seuil3) {
              return {weight: 1,opacity: 0.1,dashArray: '3',color: "white", fillColor: "red", fillOpacity: 0.5}
            }
            else if (verif > seuil2) {
              return {weight: 1,opacity: 0.1,dashArray: '3',color: "white", fillColor: "yellow", fillOpacity: 0.5}
            }
            else if (verif > seuil1) {
              return {weight: 1,opacity: 0.1,dashArray: '3',color: "white", fillColor: "orange", fillOpacity: 0.5}
            }
            else if (verif > 0) {
              return {weight: 1,opacity: 0.1,dashArray: '3',color: "white", fillColor: "green", fillOpacity: 0.5}
            }
            else if (verif <= 0) {
              return {weight: 1,opacity: 0.1,dashArray: '3',color: "white", fillColor: "grey", fillOpacity: 0.5}
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

      }).addTo(myfrugalmap);

    });

    function highlightFeature(){};
    function resetHighlight(){};
    function zoomToFeature(){};
  }



}
