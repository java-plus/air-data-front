import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import Favori from '../model/Favori';
import FavoriDto from '../model/dto/FavoriDto';
import { Observable, BehaviorSubject, Subject } from 'rxjs';


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
   * getter qui permet de récupérer le contenu du subject
   * @type Observable<Favori>
   */
  get subFavoriSelect(): Observable<Favori> {
    return this._subFavoriSelect.asObservable();
  }

  /** Méthode pour passer dans le subject un favori
   *
   * @param Favori le favori a passer dans le subject
   */
  subFavoriSelectNext(fav: Favori) {
    this._subFavoriSelect.next(fav);
  }


  // this.userConnecte.listeFavori

  constructor(private authService: AuthServiceService, private http: HttpClient) { }
  /**
   *  Méthode qui récupère du back la liste des favoris de l'utilisateur qui connecté
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
   * @param idFav l'id du favori a supprimer
   */
  supprimerFavori(idFav: number) {
    return this.http.delete<Favori>(`${environment.backendUrl}/favoris/${idFav}`, this.httpOptions);
  }

  /** méthode qui enregistre dans le back le favori qui a été modifié
   *
   *  @param favori le favori a modifier
   */
  modifierFavori(favori: Favori) {
    console.log('')
    return this.http.patch<Favori>(`${environment.backendUrl}/favoris/`,
      {
        id: favori.id,
        codeCommune: favori.commune.codeCommune,
        temperature: favori.temperature,
        tempMin: favori.tempMin,
        tempMax: favori.tempMax,
        humidity: favori.humidity,
        windDegrees: favori.windDegrees,
        windSpeed: favori.windSpeed,
        pressure: favori.pressure,
        weatherDescription: favori.weatherDescription,
        mesureSO2: favori.mesureSO2,
        mesurePM25: favori.mesurePM25,
        mesurePM10: favori.mesurePM10,
        mesureO3: favori.mesureO3,
        mesureNO2: favori.mesureNO2,
        mesureCO: favori.mesureCO,
        population: favori.population,
        weatherIcon: favori.weatherIcon
      }
      , this.httpOptions);
  }
}
