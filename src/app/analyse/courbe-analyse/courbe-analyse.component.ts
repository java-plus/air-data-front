import { Component, OnInit } from '@angular/core';
import {MesuresService} from '../../services/mesures.service';

@Component({
  selector: 'app-courbe-analyse',
  templateUrl: './courbe-analyse.component.html',
  styleUrls: []
})
/**
 * composant generant la courbe d’analyse
 */
export class CourbeAnalyseComponent implements OnInit {
  /**
   * contient le resultat de la recherche pour l’analyse
   */
  resultatRecherche = this._mesureService.subAnalyse;

  constructor(private _mesureService: MesuresService) { }

  ngOnInit() {
  }

}
