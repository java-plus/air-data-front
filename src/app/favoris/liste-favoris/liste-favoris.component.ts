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
  userConnectSub: Subscription;
  favoriSelectSub: Subscription;
  favoriAEffacerSub: Subscription;
  userConnecte: Utilisateur = undefined;
  listeFavoris: Favori[] = [];
  favoriSelection: Favori = undefined;
  favoriAEffacer: Favori = undefined;
  modeAffichageListe = false;
  modeCreation = false;
  modeModification = false;
  afficherConfirmationSuppression = false;


  constructor(
    private favoriService: FavorisService,
    private authService: AuthServiceService,
    private modalService: NgbModal
  ) { }



  setModeAffichageListe() {
    this.modeAffichageListe = true;
    this.modeCreation = false;
    this.modeModification = false;
  }
  setModeCreation() {
    this.modeAffichageListe = false;
    this.modeCreation = true;
    this.modeModification = false;
  }
  setModeModification() {
    this.modeAffichageListe = false;
    this.modeCreation = false;
    this.modeModification = true;
  }




  afficherModeCreation() {
    this.setModeCreation();
  }

  afficherModeModification(fav: Favori) {
    this.setModeModification();
    this.favoriService.subFavoriSelectNext(fav);
  }

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
    this.favoriService.subFavoriAEffacertNext(fav);
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
      if (this.listeFavoris[i].id === this.favoriAEffacer.id) {
        this.listeFavoris.splice(i, 1);
      }
    }

    this.favoriService.supprimerFavori(this.favoriAEffacer.id).subscribe(
      () => [
        this.userConnecte.listeFavori = this.listeFavoris,
        this.authService.subConnecteNext(this.userConnecte)
      ]
    );

  }








  ngOnInit() {
    this.userConnectSub = this.authService.subConnecte.subscribe(
      (userConnecte) => [
        this.userConnecte = userConnecte,
        this.listeFavoris = userConnecte.listeFavori,
        this.setModeAffichageListe()
      ]
    );
    this.favoriSelectSub = this.favoriService.subFavoriSelect.subscribe(
      (favori) => this.favoriSelection = favori
    );
    this.favoriAEffacerSub = this.favoriService.subFavoriAEffacer.subscribe(
      (favAeff) => this.favoriAEffacer = favAeff
    );

  }

  ngOnDestroy() {
    this.userConnectSub.unsubscribe();
    this.favoriSelectSub.unsubscribe();
  }

}
