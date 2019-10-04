import { Component, OnInit } from '@angular/core';
import CommunesService from '../../services/communes.service';
import Commune from '../../model/Commune';
import {Observable} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {MesuresService} from '../../services/mesures.service';
import Analyse from '../../model/Analyse';
import {NgbCalendar, NgbCalendarGregorian, NgbCalendarHebrew, NgbDate, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-formulaire-analyse',
  templateUrl: './formulaire-analyse.component.html',
  styleUrls: []
})
/**
 * composant gerant le formulaire de recherche d’analyse
 */
export class FormulaireAnalyseComponent implements OnInit {
  /**
   * parametre de recherche indicateur
   */
  indicateur: string;
  /**
   * liste des indicateur, la valeur correspond à l’envoi au back, et le nom au front
   */
  listeIndicateur = [{valeur: 'temperature', nom: 'Temperature'},
    {valeur: 'pressure', nom: 'Pression' },
    {valeur: 'humidity', nom: 'Humidité' },
    {valeur: 'tempMin', nom: 'Temperature minimum' },
    {valeur: 'tempMax', nom: 'Temperature maximum' },
    {valeur: 'windSpeed', nom: 'Vitesse du vent' },
    {valeur: 'windDegrees', nom: 'Orientation du vent'},
    {valeur: 'O3', nom: 'O3' },
    {valeur: 'PM10', nom: 'PM10' },
    {valeur: 'PM25', nom: 'PM2.5' },
    {valeur: 'NO2', nom: 'NO2' },
    {valeur: 'SO2', nom: 'SO2' },
    {valeur: 'CO', nom: 'CO' }];
  /**
   * parametre de recherche: date de debut de l’analyse
   */
  dateDebut: Date;
  /**
   * parametre de recherche: date de fin de l’analyse
   */
  dateFin: Date;
  /**
   * Commune selectionné par l’utilisateur
   */
  communeRecupere: Commune;
  /**
   * message d’erreur affiché sur la recherche rencontre un probleme
   */
  messageError: string;
  /**
   * fonction recuperant la liste des communes pour l’auto completion
   * @param text$ observable pour l’autocompletion
   */
  search = (text$: Observable<string>) => text$.pipe(flatMap((term) => this.communeService.chercherCommunes(term).pipe(map((listCommune) => listCommune.slice(0, 5)))));

  constructor(private communeService: CommunesService, private mesuresService: MesuresService) { }

  /**
   * fonction permettant d’afficher uniquement le nom de la commune dans l’autocompletion et l’input
   * @param commune la commune dont on doit recuperer le nom
   */
 recupererNomCommune(commune: Commune) {
    return commune.nom;
}

  /**
   * fonction permettant de faire la recherche de données pour l’analyse
   */
  rechercher() {
   this.mesuresService.recupererAnalyses(this.communeRecupere.codeCommune, this.indicateur, this.dateDebut, this.dateFin)
     .subscribe(() => {}, (err) => this.messageError = 'Recherche impossible.');
}

  /**
   * fonction retournant la date du jour
   */
  today(): NgbDateStruct {
    return  new NgbCalendarGregorian().getToday();
}
  ngOnInit() {
  }

}
