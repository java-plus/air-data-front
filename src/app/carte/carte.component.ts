import { Component, OnInit } from '@angular/core';
import { CarteService } from '../services/carte.service';
import { MesurePollution } from '../models/MesurePollution';
import { HttpErrorResponse } from '@angular/common/http';

declare var ol: any;

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnInit {

  latitude: number = 18.5204;
  longitude: number = 73.8567;
  codeCommune: number = 44001;
  map: any;
  listeDeMesurePollution: MesurePollution[];
  constructor(private carteService: CarteService) { }

  ngOnInit() {
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      marker: [{ 18: 73 }],
      view: new ol.View({
        center: ol.proj.fromLonLat([0, 47]),
        zoom: 8
      })
    });

    this.carteService.recupererMesures(this.codeCommune).subscribe((data: any) => {
      console.log(data);
      //this.subConnecte.next(true);
      this.listeDeMesurePollution = data;
      console.log(this.listeDeMesurePollution);

      for (const mesurePollution of this.listeDeMesurePollution) {
        this.add_map_point(mesurePollution.stationDeMesure.latitude, mesurePollution.stationDeMesure.longitude);
      }




    }, (error: HttpErrorResponse) => {
      console.log("error", error);
      //this.subConnecte.next(false);
    })
  }

  add_map_point(lat, lng) {
    var vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([parseFloat(lng), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857')),

        })]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg'
        }),
        description: new ol.style.Text(
        'This is the value of<br>the description attribute'
      )
      })
    });
    this.map.addLayer(vectorLayer);


  }

}
