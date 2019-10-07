import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavorisService } from 'src/app/services/favoris.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Favori from 'src/app/model/Favori';
import FavoriDto from '../../model/dto/FavoriDto';
import Utilisateur from 'src/app/model/Utilisateur';
import { Subscription, Observable } from 'rxjs';
import { ListeFavorisComponent } from "../liste-favoris/liste-favoris.component";
import { flatMap, map } from 'rxjs/operators';
import { CommunesService } from 'src/app/services/communes.service';
import Commune from 'src/app/model/Commune';


@Component({
  selector: 'app-creer-favoris',
  templateUrl: './creer-favoris.component.html',
  styleUrls: ['./creer-favoris.component.scss']
})

export class CreerFavorisComponent implements OnInit, OnDestroy {

  constructor(
    private favoriService: FavorisService,
    private authService: AuthServiceService,
    private listeFavorisComponent: ListeFavorisComponent,
    private communeService: CommunesService) { }

  /** l'utilisateur connecté */
  userConnecte: Utilisateur = undefined;
  /** abonnement au subject conntenant l'utilisateur connecté */
  userConnectSub: Subscription;
  /**
   * Commune selectionné par l’utilisateur
   */
  communeRecupere: Commune;

  /** favori que l'utilisateur va créer */
  nouveauFavori: FavoriDto = {
    id: undefined,
    codeCommune: undefined,
    weatherDescription: false,
    weatherIcon: false,
    temperature: false,
    pressure: false,
    humidity: false,
    tempMin: false,
    tempMax: false,
    windSpeed: false,
    windDegrees: false,
    mesureSO2: false,
    mesurePM25: false,
    mesurePM10: false,
    mesureO3: false,
    mesureNO2: false,
    mesureCO: false,
    population: false
  };


  /**
   * fonction recuperant la liste des communes pour l’auto completion
   * @param text$ observable pour l’autocompletion
   */
  search = (text$: Observable<string>) => text$.pipe(flatMap((term) => this.communeService.chercherCommunes(term)
    .pipe(map((listCommune) => listCommune.slice(0, 5)))));

  /**
   * fonction permettant d’afficher uniquement le nom de la commune dans l’autocompletion et l’input
   * @param commune la commune dont on doit recuperer le nom
   */
  recupererNomCommune(commune: Commune) {
    return commune.nom;
  }

  /**
   * Methode qui permet d'appeler le service afin d'enregistrer le nouveau favori
   */
  validerCreationFavori() {
    this.nouveauFavori.codeCommune = this.communeRecupere.codeCommune;
    this.favoriService.enregistrerFavori(this.nouveauFavori).subscribe(
      (fav) => {
        this.userConnecte.listeFavori.push(fav);
        this.authService.subConnecteNext(this.userConnecte);
      }
    );
  }
  /** méthode qui annule la création du favori et qui permet de repasser à l'affichage de la liste de favoris */
  annulerCreation() {
    this.listeFavorisComponent.setModeAffichageListe();
  }

  ngOnInit() {
    this.userConnectSub = this.authService.subConnecte.subscribe(
      (userConnecte) => {
        this.userConnecte = userConnecte;
      }
    );
  }

  ngOnDestroy() {
    this.userConnectSub.unsubscribe();

  }

}
