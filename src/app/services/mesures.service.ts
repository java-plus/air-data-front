import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import Commune from '../model/Commune';
import Analyse from '../model/Analyse';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true,
};
const URL_BACKEND = environment.backendUrl;

@Injectable({
  providedIn: 'root'
})
/**
 * service gérant les mesures
 */
export class MesuresService {

  /**
   * subject permettant de transmettre les analyses
   */
  _subAnalyse: Subject<Analyse> = new Subject<Analyse>();

  constructor(private http: HttpClient) {
  }

  /**
   * getter permettant de fournir le subject sans permettre de pouvoir écrire dedans
   */
  get subAnalyse(): Observable<Analyse> {
    return this._subAnalyse.asObservable();
  }

  /**
   * fait une requete au back pour récuperer l’ensemble des mesures d’une analyse
   * @param code code de la commune
   * @param ind indicateur de l’analyse
   * @param dd date de début de l’analyse
   * @param df date de fin de l’analyse
   */
  recupererAnalyses(code: string, ind: string, dd: Date, df: Date): Observable<Analyse> {
    const body = {
        codeCommune: code,
        indicateur: ind,
        dateDebut: dd,
        dateFin: df
      };

    return this.http.post<Analyse>(environment.backendUrl + '/mesures', body, httpOptions)
      .pipe(tap((analyse) => this._subAnalyse.next(analyse)));
  }
}
