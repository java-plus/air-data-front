import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavorisService } from 'src/app/services/favoris.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Favori from 'src/app/model/Favori';
import FavoriDto from '../../model/dto/FavoriDto';
import Utilisateur from 'src/app/model/Utilisateur';
import { Subscription } from 'rxjs';
import { ListeFavorisComponent } from "../liste-favoris/liste-favoris.component";


@Component({
  selector: 'app-creer-favoris',
  templateUrl: './creer-favoris.component.html',
  styleUrls: ['./creer-favoris.component.scss']
})

export class CreerFavorisComponent implements OnInit, OnDestroy {

  constructor(private favoriService: FavorisService, private authService: AuthServiceService, private listeFavorisComponent: ListeFavorisComponent) { }

  /** l'utilisateur connecté */
  userConnecte: Utilisateur = undefined;
  /** abonnement au subject conntenant l'utilisateur connecté */
  userConnectSub: Subscription;

  /** favori que l'utilisateur va créer */
  nouveauFavori: FavoriDto = {
    id: undefined,
    codeCommune: undefined,
    weatherDescription: false,
    weatherIcon: false,
    temperature: false,
    pressure: false,
    humidity: false,
    tempMin: false,
    tempMax: false,
    windSpeed: false,
    windDegrees: false,
    mesureSO2: false,
    mesurePM25: false,
    mesurePM10: false,
    mesureO3: false,
    mesureNO2: false,
    mesureCO: false,
    population: false
  };




  /**
   * Methode qui permet d'appeler le service afin d'enregistrer le nouveau favori
   */
  validerCreationFavori() {
    this.favoriService.enregistrerFavori(this.nouveauFavori).subscribe(
      (fav) => {
        this.userConnecte.listeFavori.push(fav);
        this.authService.subConnecteNext(this.userConnecte);
      }
    );
  }
  /** méthode qui annule la création du favori et qui permet de repasser à l'affichage de la liste de favoris */
  annulerCreation() {
    this.listeFavorisComponent.setModeAffichageListe();
  }

  ngOnInit() {
    this.userConnectSub = this.authService.subConnecte.subscribe(
      (userConnecte) => {
        this.userConnecte = userConnecte;
      }
    );
  }

  ngOnDestroy() {
    this.userConnectSub.unsubscribe();

  }

}
