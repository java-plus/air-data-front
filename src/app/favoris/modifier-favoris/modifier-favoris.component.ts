import { Component, OnInit } from '@angular/core';
import Favori from 'src/app/model/Favori';
import { FavorisService } from 'src/app/services/favoris.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modifier-favoris',
  templateUrl: './modifier-favoris.component.html',
  styleUrls: ['./modifier-favoris.component.scss']
})
export class ModifierFavorisComponent implements OnInit {

  favoriSelection: Favori;
  favoriSelectionSub: Subscription;

  constructor(private _favoriService: FavorisService) { }


  /**
   * Méthode qui modifier la valeur fasle->true ou true->false d'un indicateur dans le favori
   *
   * @param indicateur l'indicateur a modifier
   */
  toggleIndicateur(indicateur: string) {
    // this.favoriSelection.indicateur
  }


  ngOnInit() {
    this.favoriSelectionSub = this._favoriService.subFavoriSelect.subscribe(
      (favori) => [this.favoriSelection = favori, console.log(favori)]
    );
  }

}
