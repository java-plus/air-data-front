import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavorisService } from '../../services/favoris.service';
import { AuthServiceService } from '../../services/auth-service.service';
import Favori from 'src/app/model/Favori';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Utilisateur from 'src/app/model/Utilisateur';






@Component({
  selector: 'app-liste-favoris',
  templateUrl: './liste-favoris.component.html',
  styleUrls: ['./liste-favoris.component.scss']
})

export class ListeFavorisComponent implements OnInit, OnDestroy {

  closeResult: string;
  /**
   * abonnement au subject contenant l'utilisateur connecté
   */
  userConnectSub: Subscription;
  /**
   * abonnement au subject contenant le favori selectionné
   */
  favoriSelectSub: Subscription;
  /**
   * l'utilisateur connecté
   */
  userConnecte: Utilisateur = undefined;

  /**
   * la liste de favori de l'utilisateur connecté
   */
  listeFavoris: Favori[] = [];
  /**
   * le favori selectionné
   */
  favoriSelection: Favori = undefined;
  /**
   * boolean definissant l'affichage du mode liste
   */
  modeAffichageListe = false;
  /**
   * boolean definissant l'affichage du mode création
   */
  modeCreation = false;
  /**
   * boolean definissant l'affichage du modification
   */
  modeModification = false;
  /**
   * boolean definissant l'affichage de la modal de confirmation de suppression pur un favori
   */
  afficherConfirmationSuppression = false;


  constructor(
    private favoriService: FavorisService,
    private authService: AuthServiceService,
    private modalService: NgbModal
  ) { }



  /**
   * methode permettant de modifier l'ensemble des boolean des modes d 'affichage,
   * afin de passer en true uniquement le mode concerné, ici : affichage du composant 'liste"
   */
  setModeAffichageListe() {
    this.modeAffichageListe = true;
    this.modeCreation = false;
    this.modeModification = false;
  }
  /**
   * methode permettant de modifier l'ensemble des boolean des modes d 'affichage,
   * afin de passer en true uniquement le mode concerné, ici : affichage du composant 'creation'
   */
  setModeCreation() {
    this.modeAffichageListe = false;
    this.modeCreation = true;
    this.modeModification = false;
  }
  /**
   * methode permettant de modifier l'ensemble des boolean des modes d 'affichage,
   * afin de passer en true uniquement le mode concerné, ici : affichage du composant 'modification'
   */
  setModeModification() {
    this.modeAffichageListe = false;
    this.modeCreation = false;
    this.modeModification = true;
  }


  /**
   * Méthode permettant de passer en mode 'creation'
   */
  afficherModeCreation() {
    this.setModeCreation();
  }

  /**
   * Méthode qui permet d'afficher le composant de modification de favori
   * @param fav le favori a modifier
   */
  afficherModeModification(fav: Favori) {
    this.setModeModification();
    this.favoriService.subFavoriSelectNext(fav);
  }

  /** Méthode permettant d'afficher les informations en focntion du favori selectionné */
  afficherResultatFavori() {

  }

  /**
   * Méthode qui declenche l'affichage de la modal de confirmation de suppression du favor
   *
   * @param  content la modal à ouvrir
   * @param  fav le favori pour lequel la demande de confirmation de suppression est exprimée
   *
   */
  afficherConfSupp(content, fav: Favori) {
    this.afficherConfirmationSuppression = !this.afficherConfirmationSuppression;

    this.favoriService.subFavoriSelectNext(fav);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  /**
   * Méthode appelée lors de la suppression d'un favori, appelle le service FavoriService afin de supprimer le favori du 'back'.
   * Lorsque le favori est bien supprimé par le service, l'utilisateur est mis à jour et ajouté dans le subject
   * afin de l'updater et de l'avoir à jour
   *
   */
  supprimerFavori() {
    for (let i = 0; i < this.listeFavoris.length; i++) {
      if (this.listeFavoris[i].id === this.favoriSelection.id) {
        this.listeFavoris.splice(i, 1);
      }
    }
    this.favoriService.supprimerFavori(this.favoriSelection.id).subscribe(
      () => {
        this.userConnecte.listeFavori = this.listeFavoris;
        this.authService.subConnecteNext(this.userConnecte);
      }
    );
  }

  ngOnInit() {
    this.userConnectSub = this.authService.subConnecte.subscribe(
      (userConnecte) => {
        this.userConnecte = userConnecte;
        this.listeFavoris = userConnecte.listeFavori;
        this.setModeAffichageListe();
      }
    );
    this.favoriSelectSub = this.favoriService.subFavoriSelect.subscribe(
      (favori) => this.favoriSelection = favori
    );


  }

  ngOnDestroy() {
    this.userConnectSub.unsubscribe();
    this.favoriSelectSub.unsubscribe();
  }

}
