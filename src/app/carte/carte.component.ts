import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CarteService } from '../services/carte.service';
import { MesurePollution } from '../models/MesurePollution';
import { StationDeMesurePollution } from '../models/StationDeMesurePollution';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';



type MesuresPollutionParStationDeMesure = Array<{
  stationDeMesurePollution: StationDeMesurePollution,
  listeDeMesurePollutionParStationDeMesure: MesurePollution[]
}>;

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnInit {

  listeObjetsMesuresPollutionParStationDeMesure: MesuresPollutionParStationDeMesure = [];
  codeCommune: string;
  listeDeMesurePollution: MesurePollution[];
  listeDeStationDeMesure: StationDeMesurePollution[];
  latitude: number;
  longitude: number;
  json: any;


  constructor(private carteService: CarteService, private http: HttpClient) { }

  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const myfrugalmap = L.map('frugalmap').setView([47, 0], 12);



    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(myfrugalmap);

    this.http.get('assets/communes.json').subscribe((json: any) => {
      this.json = json;
      var geojson;
      let info;

      info = new L.Control();
      info.onAdd = function (myfrugalmap) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
      };

      info.update = function (props) {
        this._div.innerHTML = '<h4>Pays de la Loire </h4>' + (props ? '<b>' + props.nom + '<b>' + props.code + '</b><br />'
          : '--');
      };

      info.addTo(myfrugalmap);


      geojson = L.geoJSON(this.json, {
        style: {
          fillColor: 'grey',
          weight: 2,
          opacity: 0.1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.1
        }
        ,
        onEachFeature: function onEachFeature(feature, layer) {
          layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
          });
        }



      }).addTo(myfrugalmap);

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


      function resetHighlight(e) { geojson.resetStyle(e.target); info.update(); }

      var carteService = this.carteService;
      var listeObjetsMesuresPollutionParStationDeMesure = this.listeObjetsMesuresPollutionParStationDeMesure;
      function zoomToFeature(e) {

        myfrugalmap.fitBounds(e.target.getBounds());
        //this.afficherInfoCommunes(e.target.feature.properties.code);

        this.codeCommune = e.target.feature.properties.code;

        console.log(this.codeCommune);

        carteService.recupererMesures(this.codeCommune).subscribe((data: any) => {
          console.log(data);
          //this.subConnecte.next(true);
          this.listeDeMesurePollution = data;
          //console.log(this.listeDeMesurePollution);

          for (const mesurePollution of this.listeDeMesurePollution) {

            let laStationDeMesureEstDejaEnregistre = false;

            for (const objetMesuresPollutionParStationDeMesure of listeObjetsMesuresPollutionParStationDeMesure) {

              if (objetMesuresPollutionParStationDeMesure.stationDeMesurePollution.id == mesurePollution.stationDeMesure.id) {

                laStationDeMesureEstDejaEnregistre = true;
                objetMesuresPollutionParStationDeMesure.listeDeMesurePollutionParStationDeMesure.push(mesurePollution)

              }
              console.log(listeObjetsMesuresPollutionParStationDeMesure)
            }

            if (!laStationDeMesureEstDejaEnregistre) {
              listeObjetsMesuresPollutionParStationDeMesure.push(

                {
                  stationDeMesurePollution: mesurePollution.stationDeMesure,
                  listeDeMesurePollutionParStationDeMesure: [mesurePollution]
                }
              )
            }



          }

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
              { icon: myIcon }).bindPopup(textePopUp).addTo(myfrugalmap).openPopup();


          }

        }

          , (error: HttpErrorResponse) => {
            console.log("error", error);
            //this.subConnecte.next(false);
          })
      }
    })
  }

  afficherInfoCommunes(codeCommune) {

  }
}
