import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { CommunesService } from '../services/communes.service';
import Commune from '../model/Commune';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CreationDeCompteService } from '../services/creation-de-compte.service';

interface InfoCreationDeCompte{
  identifiant:string,
  email:string,
  age:number,
  codeCommune:string,
  motDePasse:string
}

interface CommuneGeoApi{
  nom:string,
  code:string
}

@Component({
  selector: 'app-creation-de-compte',
  templateUrl: './creation-de-compte.component.html',
  styleUrls: ['./creation-de-compte.component.scss']
})
export class CreationDeCompteComponent implements OnInit {

 infoCreationDeCompte:InfoCreationDeCompte={
  identifiant:"",
  email:"",
  age:0,
  codeCommune:"",
  motDePasse:""
};
 communeRecupere: CommuneGeoApi={
  nom:"",
  code:""
};
 confirmationMotDePasse: string;

 messageErreurConfirmationMotDePasse: string;
 messageErreurMotDePasse: string;
 messageErreurVille: string;
 messageErreurGlobal: string;

  constructor(private router:Router, private communeService:CommunesService,private authService:AuthServiceService, private creationDeCompteService:CreationDeCompteService) { }

  ngOnInit() {
  }



  laVilleEstValide(ville:string):boolean{
    if (ville===undefined || ville===null || ville==='') {
      return false
    }else{
      return true
    }
  }

  /**
   * fonction permettant d’afficher uniquement le nom de la commune dans l’autocompletion et l’input
   * @param commune la commune dont on doit recuperer le nom
   */
  recupererNomCommune(commune: Commune) {
    return commune.nom;
  }

  /**
   * fonction recuperant la liste des communes pour l’auto completion
   * @param text$ observable pour l’autocompletion
   */
  search = (text$: Observable<string>) =>
    text$.pipe(flatMap((term) =>
      this.communeService.chercherCommunes(term).pipe(
        map((listCommune) =>
          listCommune.slice(0, 5)))));


  rechercheCorrespondanceCommune(commune) {
    console.log("commune")
    console.log(commune)
    console.log("commune.nom")
    console.log(commune.nom)
    if(commune.nom==undefined){

    }else{
      commune=commune.nom
    }
    this.communeService.chercherCommunes(commune).pipe(map(items => items.filter(item => item.nom == commune)))
      .subscribe((resp) => {
        console.log("resp")
        console.log(resp)
        console.log(resp.length)
        if (resp.length == 1) {
          this.messageErreurVille = null;
          console.log(resp[0]);
          this.communeRecupere={
            nom:resp[0].nom,
            code:resp[0].code
          }
          this.communeRecupere.code = resp[0].code;
          this.communeRecupere.nom = resp[0].nom;
          console.log(this.communeRecupere)

        } else if (resp.length > 1) {
          this.messageErreurVille =
            'Plusieurs communes correspondent à celle renseignée, affinez votre recherche et sélectionnez en une dans la liste'
        } else if (resp.length == 0) {
          this.messageErreurVille =
            'Aucune commune ne correspond à celle renseignée, affinez votre recherche et sélectionnez en une dans la liste'
        }
      })
  }


  register(form: NgForm) {
    this.creationDeCompteService.creationDeCompte(
      form.value.identifiant,
      form.value.email,
      form.value.age,
      this.communeRecupere.code,
      form.value.password).subscribe(() => {
        this.authService.authentification(form.value.identifiant, form.value.password).subscribe(() => {
          this.router.navigateByUrl('');
        }, () => { });
      }, (err) => {
        err.status == 500 ?
          this.messageErreurGlobal = 'L\'identifiant renseigné est déjà utilisé, changez d\'identifiant' :

          this.messageErreurGlobal = 'Creation de compte impossible';
      });
  }


}
