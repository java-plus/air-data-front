import { Component, OnInit } from '@angular/core';
import {MesuresService} from '../../services/mesures.service';
import Analyse from '../../model/Analyse';
import {Color} from 'ng2-charts';

@Component({
  selector: 'app-courbe-analyse',
  templateUrl: './courbe-analyse.component.html',
  styleUrls: ['./courbe-analyse.component.scss']
})
/**
 * composant generant la courbe d’analyse
 */
export class CourbeAnalyseComponent implements OnInit {
  /**
   * contient le resultat de la recherche pour l’analyse et appelle la methode pour generer le graphique
   */
  resultatRecherche = this._mesureService.subAnalyse.subscribe((analyse) => {
    analyse.donnees.sort((a, b) => {
      if (new Date(a.date).getTime()  - new Date(b.date).getTime() < 0) {
        return -1;
      } else if (new Date(a.date).getTime() - new Date(b.date).getTime() > 0) {
        return 1;
      } else {
        return 0;
      }
    });
    this.creerGraphique(analyse);

    this.donneesRecu = true;
  });

  constructor(private _mesureService: MesuresService) { }

  /**
   * flag qui valide que les donnees ont été reçu
   */
  donneesRecu = false;
  /**
   * option responsive du graphique
   */
  chartOptions = {responsive: true};
  /**
   * couleur du graphique
   */
  couleur: Array<Color> = [{
    backgroundColor: '#0095ffb8'
  }];
  /**
   * valeur du graphique
   */
  chartData: {data: number[], label: string}[] = [];
  /**
   * abscisse du graphique
   */
  chartLabels: string[] = [];

  /**
   * méthode permettant de traiter les données reçu pour generer le graphique
   * @param analyse donnees du graphique
   */
  creerGraphique(analyse: Analyse) {
    this.chartData = [];
    this.chartLabels = [];
    const tableauValeur = [];
    for (const donnee of analyse.donnees) {
      tableauValeur.push(donnee.valeur);
      this.chartLabels.push(new Date(donnee.date)
        .toLocaleDateString('fr-Fr', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    }

    this.chartData.push({data: tableauValeur, label: analyse.indicateur});

  }

  ngOnInit() {
  }

}
