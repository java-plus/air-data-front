import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import Utilisateur from "../model/Utilisateur";
import {catchError, flatMap, tap} from "rxjs/operators";


const URL_BACKEND = environment.backendUrl;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * subject indiquant le dernier utilisateur connecté
   */
  private _subConnecte: BehaviorSubject<Utilisateur> = new BehaviorSubject(undefined);

  get subConnecte(): Observable<Utilisateur> {
    return this._subConnecte.asObservable();
  }

  /**
   * requete d’authentification qui recupere l’utilisateur et le transmet via le subject
   * @param nomUtilisateur identifiant de l’utilisateur
   * @param motDePasse mot de passe de l’utilisateur
   */
  authentification(nomUtilisateur, motDePasse): Observable<Utilisateur> {
    return this.http
      .post(URL_BACKEND + '/auth',
        {
          identifiant: nomUtilisateur,
          mdp: motDePasse
        },
        httpOptions
      )
      .pipe(flatMap(() => {
        return this.http.get<Utilisateur>(`${URL_BACKEND}/auth/user`, {withCredentials: true});
      }), tap((utilisateur) => {
          this._subConnecte.next(utilisateur);
          this.router.navigate(['accueil']);
        })
      );
  }

  /**
   * permet de verifier si un utilisateur est connecté et de recuperer ses informations
   */
  isLoggedIn(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${URL_BACKEND}/auth/user`, {withCredentials: true});
  }
}
