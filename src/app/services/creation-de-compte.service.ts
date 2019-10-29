import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

const URL_BACKEND = environment.backendUrl;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class CreationDeCompteService {

  constructor(private http:HttpClient) { }


  /**
  * permet de creer un compte à l'utilisa l’utilisateur
  */
 creationDeCompte(nomUtilisateur, email, age, codeCommune, motDePasse): Observable<any> {
  console.log(nomUtilisateur, email, age, codeCommune, motDePasse);
  return this.http.post<any>(URL_BACKEND + '/compte',
    {
      identifiant: nomUtilisateur,
      email: email,
      age: age,
      codeCommune: codeCommune,
      motDePasse: motDePasse
    },
    httpOptions);

    //.pipe(
      //tap(() => this.loginService.authentification(nomUtilisateur, motDePasse)));
}
}
