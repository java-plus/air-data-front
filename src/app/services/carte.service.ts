import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MesurePollution } from '../models/MesurePollution';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

const URL_BACKEND=environment.backendUrl;

@Injectable({
  providedIn: 'root'
})
export class CarteService {

  constructor(private http: HttpClient) { }

  recupererMesures(codeCommune:string):Observable<MesurePollution[]>{

    return this.http
        .get<MesurePollution[]>(`${URL_BACKEND}/mesures/pollution?codeCommune=${codeCommune}`, { withCredentials: true})
        //.pipe(tap(list => (this.listeDeMatricules = list)));
        .pipe(
          tap(mesurePollution => {
            mesurePollution
        }));

  }
}
