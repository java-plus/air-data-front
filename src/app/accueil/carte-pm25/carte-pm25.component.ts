import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { CarteService } from 'src/app/services/carte.service';

@Component({
  selector: 'app-carte-pm25',
  templateUrl: './carte-pm25.component.html',
  styleUrls: ['./carte-pm25.component.scss']
})
export class CartePm25Component implements OnInit {

  constructor(private http : HttpClient, private carteService: CarteService) { }

  ngOnInit() {
    console.log("pm25")
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    if (L.map('frugalmap')){
      L.map('frugalmap').off();
      L.map('frugalmap').remove();
    }
    const myfrugalmap = L.map('frugalmap').setView([47.4712, -0.3], 8);
    const group = L.featureGroup().addTo(myfrugalmap);

    L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(myfrugalmap);

    // chargement du fichiers communes.json pour créer le périmètre des communes
    this.carteService.getGeoJsonBack().subscribe((json: any) => {
      console.log("----------------------------");
console.log(json);
      let geojson;



      geojson = L.geoJSON(json, {

          style: function(feature) {
            if (Number(feature.properties.pm25) > 90) {
              return {weight: 1,opacity: 0.1,dashArray: '3',color: "white", fillColor: "purple", fillOpacity: 0.5}
            }
            if (Number(feature.properties.pm25) > 40) {
              return {weight: 1,opacity: 0.1,dashArray: '3',color: "white", fillColor: "red", fillOpacity: 0.5}
            }
            else if (Number(feature.properties.pm25) > 30) {
              return {weight: 1,opacity: 0.1,dashArray: '3',color: "white", fillColor: "yellow", fillOpacity: 0.5}
            }
            else if (Number(feature.properties.pm25) > 15) {
              return {weight: 1,opacity: 0.1,dashArray: '3',color: "white", fillColor: "orange", fillOpacity: 0.5}
            }
            else if (Number(feature.properties.pm25) > 0) {
              return {weight: 1,opacity: 0.1,dashArray: '3',color: "white", fillColor: "green", fillOpacity: 0.5}
            }
            else if (Number(feature.properties.pm25) <= 0) {
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
  }}
