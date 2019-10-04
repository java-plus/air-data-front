import { Component, OnInit } from '@angular/core';
import { FavorisService } from 'src/app/services/favoris.service';


@Component({
  selector: 'app-creer-favoris',
  templateUrl: './creer-favoris.component.html',
  styleUrls: ['./creer-favoris.component.scss']
})
export class CreerFavorisComponent implements OnInit {

  constructor(private favoriService: FavorisService) { }





  /**
   *
   * Methode qui creer un nouveau favori
   *
   */
  creerFavori() {

  }



  ngOnInit() {

  }

}
