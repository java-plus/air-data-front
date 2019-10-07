import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import Commune from '../model/Commune';
import {Observable, of, Subject} from 'rxjs';
import {filter, flatMap, map, tap} from 'rxjs/operators';


const URL_BACKEND = environment.backendUrl;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};


/**
 * Service lié à la manipulation de commune
 */
@Injectable({
  providedIn: 'root'
})
export class CommunesService {

  /**
   * tableau stockant la liste des communes, servant de cache
   */
  listeCommunes: Commune[];

  constructor(private http: HttpClient) {
  }

  /**
   * fonction récuperant la liste des communes sur l’api ou dans le cache et retourne
   * la liste des communes dont le nom contient la chaine de caractere recherchée
   * @param model chaine de caractere qui est recherché
   */
  chercherCommunes(model: string): Observable<Commune[]> {
    if (this.listeCommunes) {
      return of(this.listeCommunes.filter((commune) => commune.nom.toLowerCase().search(model.toLowerCase()) >= 0));
    } else {
      return this.http.get<Commune[]>(environment.backendUrl + '/communes', httpOptions)
        .pipe(tap((listCom) => this.listeCommunes = listCom),
          map((listCom) => listCom.filter((commune) => commune.nom.toLowerCase().search(model.toLowerCase()) >= 0)));
    }
  }

}
