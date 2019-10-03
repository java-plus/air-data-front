import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FavorisService } from '../../services/favoris.service';
import { AuthServiceService } from '../../services/auth-service.service';
import Favori from 'src/app/model/Favori';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-liste-favoris',
  templateUrl: './liste-favoris.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./liste-favoris.component.scss']
})

export class ListeFavorisComponent implements OnInit, OnDestroy {
  closeResult: string;
  userConnectSub: Subscription;
  listeFavoris: Favori[] = [];
  modeCreation = false;
  modeModification = false;

  constructor(
    private favoriService: FavorisService,
    private authService: AuthServiceService,
    private modalService: NgbModal
  ) { }

  openVerticallyCentered(content) {
    console.log(content)
    this.modalService.open(content, { centered: true });
  }

  afficherModeCreation() {
    this.modeCreation = true;
  }

  afficherModeModification() {
    this.modeModification = true;
  }

  afficherResultatFavori() {

  }
  supprimer() {

  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.userConnectSub = this.authService.subConnecte.subscribe((userConnecte) => this.listeFavoris = userConnecte.listeFavori);
  }

  ngOnDestroy() {
    this.userConnectSub.unsubscribe();

  }

}
