import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import Favori from '../model/Favori';
import FavoriDto from '../model/dto/FavoriDto';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import Utilisateur from '../model/Utilisateur';

@Injectable({
  providedIn: 'root'
})



export class FavorisService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true
  };

  /**
   * BehaviorSubjet dans lequel "passe" le favori selectionné
   */
  private _subFavoriSelect = new BehaviorSubject<Favori>(undefined);

  /**
   * Subject dans lequel passe le favori à effacer
   *
   */
  private _subFavoriAEffacer = new Subject<Favori>();

  get subFavoriSelect(): Observable<Favori> {
    return this._subFavoriSelect.asObservable();
  }

  subFavoriSelectNext(fav: Favori) {
    this._subFavoriSelect.next(fav);
  }


  subFavoriAEffacertNext(fav: Favori) {
    this._subFavoriAEffacer.next(fav);
  }
  get subFavoriAEffacer(): Observable<Favori> {
    return this._subFavoriAEffacer.asObservable();
  }

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
   *  Méthode qui enregistre dans le back le favori
   *
   * @param favori le favori a enregistrer
   */
  enregistrerFavori(favori: FavoriDto) {
    return this.http.post<Favori>(`${environment.backendUrl}/favoris`, favori, this.httpOptions);

  }


  /**
   * Méthode qui supprime le favori en fonction de son id
   *
   * @param idFav l'id du favori a supprimer
   */
  supprimerFavori(idFav: number) {
    return this.http.delete<Favori>(`${environment.backendUrl}/favoris/${idFav}`, this.httpOptions);
  }

  modifierFavori() { }

}
