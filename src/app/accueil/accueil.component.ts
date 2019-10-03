import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: []
})
export class AccueilComponent implements OnInit {

  clickSurCarte = false;

  constructor() { }

  ngOnInit() {
  }

  methodeClickSurCarte() {
    this.clickSurCarte = true;
  }

}
