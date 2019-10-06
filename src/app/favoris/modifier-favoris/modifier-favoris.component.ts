import { Component, OnInit, OnDestroy } from '@angular/core';
import Favori from 'src/app/model/Favori';
import { FavorisService } from 'src/app/services/favoris.service';
import { Subscription } from 'rxjs';
import { ListeFavorisComponent } from "../liste-favoris/liste-favoris.component";

@Component({
  selector: 'app-modifier-favoris',
  templateUrl: './modifier-favoris.component.html',
  styleUrls: ['./modifier-favoris.component.scss']
})

export class ModifierFavorisComponent implements OnInit, OnDestroy {

  favoriSelection: Favori;
  favoriSelectionTemp: Favori;
  favoriSelectionSub: Subscription;



  constructor(private _favoriService: FavorisService, private listeFavorisComponent: ListeFavorisComponent) { }


  creerFavoriTempCopie(fav) {
    this.favoriSelectionTemp = { ...fav };
  }

  validerModificationFavori() {

  }

  annulerModification() {
    this.favoriSelectionTemp = this.favoriSelection;
    this._favoriService.subFavoriSelectNext(this.favoriSelection);

    this.listeFavorisComponent.setModeAffichageListe();
  }

  ngOnInit() {
    this.favoriSelectionSub = this._favoriService.subFavoriSelect.subscribe(
      (favori) => [this.favoriSelection = favori,
      this.creerFavoriTempCopie(favori)]

    );
  }
  ngOnDestroy() {
    this.favoriSelectionSub.unsubscribe();

  }
}
