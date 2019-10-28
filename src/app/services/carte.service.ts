import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MesurePollution } from '../model/MesurePollution';
import { MesureMeteo } from '../model/MesureMeteo';
import * as L from 'leaflet';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import StationDeMesurePollution from '../model/StationDeMesurePollution';

const URL_BACKEND=environment.backendUrl;

type MesuresPollutionParStationDeMesure = Array<{
  stationDeMesurePollution: StationDeMesurePollution,
  listeDeMesurePollutionParStationDeMesure: MesurePollution[]
}>;

@Injectable({
  providedIn: 'root'
})
export class CarteService {

  idLayerEnregistre:number;

  getIdLayerEnregistre():number{
    return this.idLayerEnregistre;
  }
  setIdLayerEnregistre(idLayerNouveau:number){
    this.idLayerEnregistre=idLayerNouveau;
  }

  /**
   * subject permettant de transmettre les mesures de pollution au composant "sous-la-carte-coponent"
   */
  _subMesuresPollutionCommuneConcerne: Subject<MesurePollution[]> = new Subject<MesurePollution[]>();
  /**
   * subject permettant de transmettre les mesures de meteo au composant "sous-la-carte-coponent"
   */
  _subMesuresMeteoCommuneConcerne: Subject<MesureMeteo> = new Subject<MesureMeteo>();
/**
   * subject permettant de transmettre le nom d ela commune concernée au composant "sous-la-carte-coponent"
   */
  _subNomCommuneConcerne: Subject<string> = new Subject<string>();

  /**
   * getter permettant de fournir le subject sans permettre de pouvoir écrire dedans
   */
  get subMesuresPollutionCommuneConcerne(): Observable<MesurePollution[]> {
    return this._subMesuresPollutionCommuneConcerne.asObservable();
  }

   /**
   * getter permettant de fournir le subject sans permettre de pouvoir écrire dedans
   */
  get subMesuresMeteoCommuneConcerne(): Observable<MesureMeteo> {
    return this._subMesuresMeteoCommuneConcerne.asObservable();
  }

  /**
   * getter permettant de fournir le subject sans permettre de pouvoir écrire dedans
   */
  get subNomCommuneConcerne(): Observable<string> {
    return this._subNomCommuneConcerne.asObservable();
  }

  constructor(private http: HttpClient) { }

  /**
   * Cet fonction fait une requete dans le back pour obtenir les mesures météo relative à une commune
   * Elle les insère ensuite dans un subject (ici _subMesuresPollutionCommuneConcerne) afin de passer l'information de composants en comosants
   */
  publierDansSubjectMesuresMeteoCourante(codeCommune:string):Observable<MesureMeteo>{

    return this.http
        .get<MesureMeteo>(`${URL_BACKEND}/mesures/meteo?codeCommune=${codeCommune}`, { withCredentials: true})
        .pipe(
          tap(mesureMeteo => {
            this._subMesuresMeteoCommuneConcerne.next(mesureMeteo);
        }));

  }

  /**
   * Cet fonction fait une requete dans le back pour obtenir les mesures pollution relative à une commune
   * Elle les insère ensuite dans un subject (ici _subMesuresPollutionCommuneConcerne) afin de passer l'information de composants en comosants
   */
  getGeoJsonBack():Observable<any>{

    return this.http
        .get<any>(`${URL_BACKEND}/communes/geojson`, { withCredentials: true})
        ;

  }

  /**
   * Cet fonction fait une requete dans le back pour obtenir les mesures pollution relative à une commune
   * Elle les insère ensuite dans un subject (ici _subMesuresPollutionCommuneConcerne) afin de passer l'information de composants en comosants
   */
  recupererMesures(codeCommune:string):Observable<MesurePollution[]>{

    return this.http
        .get<MesurePollution[]>(`${URL_BACKEND}/mesures/pollution?codeCommune=${codeCommune}`, { withCredentials: true})
        .pipe(
          tap(mesurePollution => {
            mesurePollution;
            this._subMesuresPollutionCommuneConcerne.next(mesurePollution);
        }));

  }

  publierDansSubjectCommuneCourante(nom:string){
    this._subNomCommuneConcerne.next(nom);
  }

  obtenirCoordonneeGpsCommune(codeCommune):Observable<any[]>{
    return this.http
        .get<any[]>(`https://geo.api.gouv.fr/communes?code=${codeCommune}&fields=centre&format=json&geometry=centre`);
  }


  obtenirBoondPourZoom(latCommune: number, lngCommune: number, listeDeMesurePollution: MesurePollution[]): number[] {
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
    latCommune > latMax ? latMax = latCommune : latMax = latMax;
    latCommune < latMin ? latMin = latCommune : latMin = latMin;

    lngCommune > lngMax ? lngMax = lngCommune : lngMax = lngMax;
    lngCommune < lngMin ? lngMin = lngCommune : lngMin = lngMin;

    let reponse: number[] = [latMin, lngMax, latMax, lngMin];


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


}
