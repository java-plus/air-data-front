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
  _subMesuresMeteoCommuneConcerne: Subject<MesureMeteo> = new Subject<MesureMeteo>();


  /**
   * getter permettant de fournir le subject sans permettre de pouvoir écrire dedans
   */
  get subMesuresPollutionCommuneConcerne(): Observable<MesurePollution[]> {
    return this._subMesuresPollutionCommuneConcerne.asObservable();
  }

  get subMesuresMeteoCommuneConcerne(): Observable<MesureMeteo> {
    return this._subMesuresMeteoCommuneConcerne.asObservable();
  }

  constructor(private http: HttpClient) { }

  recupererMesuresMeteo(codeCommune:string):Observable<MesureMeteo>{

    return this.http
        .get<MesureMeteo>(`${URL_BACKEND}/mesures/meteo?codeCommune=${codeCommune}`, { withCredentials: true})
        //.pipe(tap(list => (this.listeDeMatricules = list)));
        .pipe(
          tap(mesureMeteo => {
            this._subMesuresMeteoCommuneConcerne.next(mesureMeteo);
            console.log(mesureMeteo);
        }));

  }

  recupererMesures(codeCommune:string):Observable<MesurePollution[]>{

    return this.http
        .get<MesurePollution[]>(`${URL_BACKEND}/mesures/pollution?codeCommune=${codeCommune}`, { withCredentials: true})
        //.pipe(tap(list => (this.listeDeMatricules = list)));
        .pipe(
          tap(mesurePollution => {
            mesurePollution;
            this._subMesuresPollutionCommuneConcerne.next(mesurePollution);
            console.log(mesurePollution)
        }));

  }
}
