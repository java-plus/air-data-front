
import { Component, OnInit } from '@angular/core';
import { CarteComponent } from './carte/carte.component';
import { CarteSo2Component } from './carte-so2/carte-so2.component';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: []
})
export class AccueilComponent implements OnInit {

  clickSurCarte = false;
  pm10:boolean;
  pm25:boolean;
  so2:boolean;
  no2:boolean;
  co:boolean;
  o3:boolean;

  constructor() { }

  ngOnInit() {
  }

  methodeClickSurCarte() {
    this.clickSurCarte = true;
  }

}
