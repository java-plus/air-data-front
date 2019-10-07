import { Component, OnInit } from '@angular/core';
import Commune from "../../model/Commune";
import {Observable} from "rxjs";
import {flatMap, map} from "rxjs/operators";
import {CommunesService} from "../../services/communes.service";
import {CarteService} from "../../services/carte.service";

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {

  /**
   * Commune selectionné par l’utilisateur
   */
  communeRecupere: Commune;

  /**
   * fonction recuperant la liste des communes pour l’auto completion
   * @param text$ observable pour l’autocompletion
   */
  search = (text$: Observable<string>) => text$.pipe(flatMap((term) => this.communeService.chercherCommunes(term).pipe(map((listCommune) => listCommune.slice(0, 5)))));

  constructor(private communeService: CommunesService, private carteService: CarteService) { }

  /**
   * fonction permettant de faire la recherche de données pour l’analyse
   */
  rechercher() {
    this.carteService.recupererMesures(this.communeRecupere.codeCommune).subscribe(() => {}, () => {});
    this.carteService.recupererMesuresMeteo(this.communeRecupere.codeCommune).subscribe(() => {}, () => {});
  }

  /**
   * fonction permettant d’afficher uniquement le nom de la commune dans l’autocompletion et l’input
   * @param commune la commune dont on doit recuperer le nom
   */
  recupererNomCommune(commune: Commune) {
    return commune.nom;
  }
  ngOnInit() {
  }

}
