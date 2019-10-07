import { Component, OnInit, OnDestroy } from '@angular/core';
import Favori from 'src/app/model/Favori';
import { FavorisService } from 'src/app/services/favoris.service';
import { Subscription } from 'rxjs';
import { ListeFavorisComponent } from "../liste-favoris/liste-favoris.component";
import { AuthServiceService } from "../../services/auth-service.service";
import Utilisateur from 'src/app/model/Utilisateur';


@Component({
  selector: 'app-modifier-favoris',
  templateUrl: './modifier-favoris.component.html',
  styleUrls: ['./modifier-favoris.component.scss']
})

export class ModifierFavorisComponent implements OnInit, OnDestroy {

  /**
   * le favori selectionné par l'utilisateur.
   * Celui qui sera donc modifié ou supprmimé selon le choix de l'utilisateur
   */
  favoriSelection: Favori;

  /**
   * copie temporaire du favroi selectionné, utilisé pour la modification,
   * afin de ne pas modifier le 'vrai' favori si jamais l'utilisateur annule la modif
   */
  favoriSelectionTemp: Favori;

  /**
   * l'abonnnement au subject de FavoriService.
   */
  favoriSelectionSub: Subscription;
  /**
   * la liste de favori de l'utilisateur connecté
   */
  listeFavoris: Favori[] = [];
  /**
   * abonnement au subject contenant l'utilisateur connecté
   */
  userConnectSub: Subscription;
  /**
   * l'utilisateur connecté
   */
  userConnecte: Utilisateur = undefined;

  constructor(private _favoriService: FavorisService, private listeFavorisComponent: ListeFavorisComponent, private authService: AuthServiceService) { }


  /**
   * Méthode qui permet de créer un favori temporaire, copie du favori selectionné par l'utilisateur
   */
  creerFavoriTempCopie(fav) {
    this.favoriSelectionTemp = { ...fav };
  }


  modifierliste() {
    for (let index = 0; index < this.listeFavoris.length; index++) {
      if (this.favoriSelectionTemp.id === this.listeFavoris[index].id) {
        this.listeFavoris[index] = this.favoriSelectionTemp;
      }
    }

  }


  /**
   * Méthode qui permet de valider et d'appeler le service afin d'enregistrer dans le back les modifications effectuées sur le favori
   */
  validerModificationFavori() {
    this._favoriService.modifierFavori(this.favoriSelectionTemp).subscribe(
      () => {
        this.modifierliste();
        this.userConnecte.listeFavori = this.listeFavoris;
        this.authService.subConnecteNext(this.userConnecte);
      }
    );
  }
  /**
   * méthode qui permet d'annuler les modifications effectuées sur le favori selectionné.
   * Remise à 'zéro' du favori temporaire et envoi du favori dans son état avant modif dans le subject
   */
  annulerModification() {
    this.favoriSelectionTemp = this.favoriSelection;
    this._favoriService.subFavoriSelectNext(this.favoriSelection);
    this.listeFavorisComponent.setModeAffichageListe();
  }

  ngOnInit() {
    this.userConnectSub = this.authService.subConnecte.subscribe(
      (userConnecte) => {
        this.userConnecte = userConnecte;
        this.listeFavoris = userConnecte.listeFavori;
      }
    );
    this.favoriSelectionSub = this._favoriService.subFavoriSelect.subscribe(
      (favori) => {
        this.favoriSelection = favori;
        this.creerFavoriTempCopie(favori);
      }

    );
  }
  ngOnDestroy() {
    this.favoriSelectionSub.unsubscribe();
    this.userConnectSub.unsubscribe();
  }
}
