import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavorisService } from '../../services/favoris.service';
import { AuthServiceService } from '../../services/auth-service.service';
import Favori from 'src/app/model/Favori';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';






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
  listeFavoris: Favori[] = [];
  favoriSelection: Favori = undefined;
  favoriAEffacer: Favori = undefined;
  modeAffichage = false;
  modeCreation = false;
  modeModification = false;
  afficherConfirmationSuppression = false;


  constructor(
    private favoriService: FavorisService,
    private authService: AuthServiceService,
    private modalService: NgbModal
  ) { }



  afficherModeCreation() {
    this.modeCreation = true;

  }

  afficherModeModification(fav: Favori) {
    this.modeModification = true;
    this.favoriService.subFavoriSelectNext(fav);
  }

  afficherResultatFavori() {

  }


  /**
   * Méthode qui declenche l'affichage de la modal de confirmation de suppression du favor
   *
   * @param  content le
   * @param  fav le favori
   *
   */
  afficherConfSupp(content, fav: Favori) {
    this.afficherConfirmationSuppression = !this.afficherConfirmationSuppression;
    this.favoriService.subFavoriAEffacertNext(fav);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }

  /**
   * Méthode appelée lors de la suppression d'un favori, appelle le service FavoriService afin de supprimer le favori du 'back'
   *
   */
  supprimerFavori() {
    this.favoriService.supprimerFavori(this.favoriAEffacer.id).subscribe(() => console.log('fin suppression :'));
  }





  setModeAffichage() {
    this.modeAffichage = true;
    this.modeCreation = false;
    this.modeModification = false;
  }
  setModeCreation() {
    this.modeAffichage = false;
    this.modeCreation = true;
    this.modeModification = false;
  }
  setModeModification() {
    this.modeAffichage = false;
    this.modeCreation = false;
    this.modeModification = true;
  }



  ngOnInit() {
    this.userConnectSub = this.authService.subConnecte.subscribe(
      (userConnecte) => [
        this.listeFavoris = userConnecte.listeFavori,
        this.setModeAffichage()
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
