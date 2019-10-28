import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CarteService} from 'src/app/services/carte.service';
import {MesureMeteo} from 'src/app/model/MesureMeteo';


// Classe représentant le comosant sous la carte
@Component({
  selector: 'app-sous-la-carte',
  templateUrl: './sous-la-carte.component.html',
  styleUrls: ['./sous-la-carte.component.scss']
})
export class SousLaCarteComponent implements OnInit {

  // variable représentant la liste des 6 mesures pollution d'un commune (CO,NO2,SO2,PM10,PM2.5)
  // Cette valeur est chargée grâce à une promesse et est donc asynchrone
  mesuresPollution = this.carteService.subMesuresPollutionCommuneConcerne;
  // variable représentant la liste des mesures météo d'une commune
  // Cette valeur est chargée grâce à une promesse et est donc asynchrone
  mesuresMeteo: MesureMeteo;

  @Output() estAffichable = new EventEmitter();

  nomCommuneConcerne: string;

  constructor(private carteService: CarteService) {
  }

  // à l'initialisation du composant la liste des mesures météo est chargée
  ngOnInit() {
    this.carteService.subNomCommuneConcerne.subscribe((data) => this.nomCommuneConcerne = data);
    this.carteService.subMesuresMeteoCommuneConcerne.subscribe((data) => {
      this.mesuresMeteo = data;
      this.estAffichable.next(true);
    });
  }

}
