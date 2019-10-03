import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import Favori from '../model/Favori';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import Utilisateur from '../model/Utilisateur';

@Injectable({
  providedIn: 'root'
})





export class FavorisService {

  /**
   * BehaviorSubjet dans lequel "passe" le favori selectionné
   */
  private subFavoriSelect = new Subject<Favori[]>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true
  };




  // this.userConnecte.listeFavori

  constructor(private authService: AuthServiceService, private http: HttpClient) { }





  /**
   *  Méthode qui récupère du back la liste des favoris de l'utilisateur qui connecté
   *
   * @returns  retourne un {Observable<Favori[]>}
   */
  recupererFavorisUserConnecte(): Observable<Favori[]> {
    return this.http.get<Favori[]>(`${environment.backendUrl}/favoris`, this.httpOptions);

  }

  /**
   * Méthode qui supprime un favori de l'utilisateur qui est connecté
   *
   *
   */
  enregistrerFavori() {

  }

  supprimerFavori() {

  }

  modifierFavori() { }

}
