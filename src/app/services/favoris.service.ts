import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})





export class FavorisService {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true
  };

  listeFavoris = [
    {
      id: 1,
      commune: {
        id: 2,
        nom: 'Aigrefeuille-sur-Maine',
        codeCommune: '44002',
        latitude: 47.0733,
        longitude: -1.4137,
        population: 3763,
        listeDeStationsDeMesures: null,
        stationDeMesureMeteo: {
          id: 2,
          latitude: 47.17,
          longitude: -1.47
        },
        distanceStationDeMesureMeteo: 12432,
        distance: 21239,
        stationDeMesureSO2: {
          id: 28,
          latitude: 47.283184,
          longitude: -1.7831649,
          mesureSO2: true,
          mesurePM25: false,
          mesurePM10: true,
          mesureO3: false,
          mesureNO2: true,
          mesureCO: false
        },
        distanceSO2: 47212,
        stationDeMesurePM25: {
          id: 22,
          latitude: 47.20439,
          longitude: -1.5528278,
          mesureSO2: false,
          mesurePM25: true,
          mesurePM10: true,
          mesureO3: false,
          mesureNO2: true,
          mesureCO: true
        },
        distancePM25: 21239,
        stationDeMesurePM10: {
          id: 22,
          latitude: 47.20439,
          longitude: -1.5528278,
          mesureSO2: false,
          mesurePM25: true,
          mesurePM10: true,
          mesureO3: false,
          mesureNO2: true,
          mesureCO: true
        },
        distancePM10: 21239,
        stationDeMesureO3: {
          id: 7,
          latitude: 47.222515,
          longitude: -1.5375025,
          mesureSO2: false,
          mesurePM25: true,
          mesurePM10: true,
          mesureO3: true,
          mesureNO2: true,
          mesureCO: false
        },
        distanceO3: 21542,
        stationDeMesureNO2: {
          id: 22,
          latitude: 47.20439,
          longitude: -1.5528278,
          mesureSO2: false,
          mesurePM25: true,
          mesurePM10: true,
          mesureO3: false,
          mesureNO2: true,
          mesureCO: true
        },
        distanceNO2: 21239,
        stationDeMesureCO: {
          id: 22,
          latitude: 47.20439,
          longitude: -1.5528278,
          mesureSO2: false,
          mesurePM25: true,
          mesurePM10: true,
          mesureO3: false,
          mesureNO2: true,
          mesureCO: true
        },
        distanceCO: 21239,
        stationDeMesure: {
          id: 22,
          latitude: 47.20439,
          longitude: -1.5528278,
          mesureSO2: false,
          mesurePM25: true,
          mesurePM10: true,
          mesureO3: false,
          mesureNO2: true,
          mesureCO: true
        }
      },
      weatherDescription: false,
      weatherIcon: false,
      temperature: true,
      pressure: true,
      humidity: false,
      tempMin: false,
      tempMax: true,
      windSpeed: false,
      windDegrees: false,
      mesureSO2: false,
      mesurePM25: true,
      mesurePM10: false,
      mesureO3: true,
      mesureNO2: false,
      mesureCO: true
    }
  ];


  constructor(private authService: AuthServiceService) { }


  enregistrerFavori() {

  }

  supprimerFavori() {

  }

  modifierFavori() { }

}
