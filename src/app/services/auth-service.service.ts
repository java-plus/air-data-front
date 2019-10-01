import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


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

  constructor(private http: HttpClient, private router: Router) { }

  private subConnecte = new BehaviorSubject(false);

  authentification(_nomUtilisateur, _motDePasse) {
    this.http
      .post(
        // url d'accès au service
        URL_BACKEND + "/auth",

        // corps de la réquête
        {
          identifiant: _nomUtilisateur,
          mdp: _motDePasse
        },

        // options de la requête HTTP
        httpOptions
      )
      .subscribe((data: any) => {
        console.log(HttpResponse);
        this.subConnecte.next(true);
        this.router.navigate(["accueil"])
      }, (error: HttpErrorResponse) => {
        console.log("error", error);
        this.subConnecte.next(false);
      });
  }

  isLoggedIn():Observable<any>{
    return this.http.get(`${URL_BACKEND}/compte`,{withCredentials: true})
  }
}
