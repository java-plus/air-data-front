import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavorisService } from '../../services/favoris.service';
import { AuthServiceService } from '../../services/auth-service.service';
import Favori from 'src/app/model/Favori';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-liste-favoris',
  templateUrl: './liste-favoris.component.html',
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
    private authService: AuthServiceService
  ) { }


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


  ngOnInit() {

    this.userConnectSub = this.authService.subConnecte.subscribe((userConnecte) => this.listeFavoris = userConnecte.listeFavori);
  }

  ngOnDestroy() {
    this.userConnectSub.unsubscribe();

  }

}
