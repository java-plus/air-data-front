
import { Component, OnInit } from '@angular/core';
import { CarteComponent } from './carte/carte.component';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  clickSurCarte = false;

  affichageCarteCouleur: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  methodeClickSurCarte() {
    this.clickSurCarte = true;
  }

  changerValeurAffichageCarteCouleur() {
    if (this.affichageCarteCouleur) {
      this.affichageCarteCouleur = false;
    } else {
      this.affichageCarteCouleur = true;
    }
  }

}
