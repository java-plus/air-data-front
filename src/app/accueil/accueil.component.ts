
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: []
})
export class AccueilComponent implements OnInit {

  clickSurCarte = false;
  affichageDonnees = false;
  styleCarte = [' #969696', ' 100%'];
  constructor() { }

  ngOnInit() {
  }

  methodeClickSurCarte() {
    this.clickSurCarte = true;
  }

  changerAffichageDonnees(event: boolean) {
    this.styleCarte = [' #969696', ' 70%'];
    this.affichageDonnees = event;
  }
}
