import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MesurePollution } from '../model/MesurePollution';
import { MesureMeteo } from '../model/MesureMeteo';

import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

const URL_BACKEND=environment.backendUrl;



@Injectable({
  providedIn: 'root'
})
export class CarteService {

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
}
