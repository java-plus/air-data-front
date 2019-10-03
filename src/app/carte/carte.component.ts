import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CarteService } from '../services/carte.service';
import { MesurePollution } from '../models/MesurePollution';
import { StationDeMesurePollution } from '../models/StationDeMesurePollution';
import { HttpErrorResponse } from '@angular/common/http';

import "leaflet-mouse-position";

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
  codeCommune: number;
  listeDeMesurePollution: MesurePollution[];
  listeDeStationDeMesure: StationDeMesurePollution[];
latitude:number;
longitude:number;
  constructor(private carteService: CarteService) { }

  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const myfrugalmap = L.map('frugalmap').setView([47, 0], 12);

    const Coordinates = L.Control.extend({
      onAdd: map => {
        const container = L.DomUtil.create("div");
        map.addEventListener("click", e => {

            this.latitude=e.latlng.lat
            this.longitude=e.latlng.lng
       });
       return container;
     }
  });
  myfrugalmap.addControl(new Coordinates({ position: "bottomleft" }));

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(myfrugalmap);



    this.carteService.recupererMesures(this.codeCommune).subscribe((data: any) => {
      console.log(data);
      //this.subConnecte.next(true);
      this.listeDeMesurePollution = data;
      //console.log(this.listeDeMesurePollution);

      for (const mesurePollution of this.listeDeMesurePollution) {

        let laStationDeMesureEstDejaEnregistre = false;

        for (const objetMesuresPollutionParStationDeMesure of this.listeObjetsMesuresPollutionParStationDeMesure) {

          if (objetMesuresPollutionParStationDeMesure.stationDeMesurePollution.id == mesurePollution.stationDeMesure.id) {

            laStationDeMesureEstDejaEnregistre = true;
            objetMesuresPollutionParStationDeMesure.listeDeMesurePollutionParStationDeMesure.push(mesurePollution)

          }
          console.log(this.listeObjetsMesuresPollutionParStationDeMesure)
        }

        if (!laStationDeMesureEstDejaEnregistre) {
          this.listeObjetsMesuresPollutionParStationDeMesure.push(

            {
              stationDeMesurePollution: mesurePollution.stationDeMesure,
              listeDeMesurePollutionParStationDeMesure: [mesurePollution]
            }
          )
        }



      }

      for (const objetMesuresPollutionParStationDeMesure of this.listeObjetsMesuresPollutionParStationDeMesure) {

        const myIcon = L.icon({

          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
          iconAnchor:   [10, 30],
          iconSize:[20,30]
        });

        let textePopUp: string='';
        for (const mesurePollution of objetMesuresPollutionParStationDeMesure.listeDeMesurePollutionParStationDeMesure) {

            textePopUp =textePopUp+ ` ${mesurePollution.typeDeDonnee} : ${mesurePollution.valeur} --`


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

    truc(){
      console.log(this.latitude + " " + this.longitude)
    }
  }
