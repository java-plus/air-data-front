import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  identifiant = 'admin';
  password = 'Admin44000;';
  messageError: string;

  constructor(private authService: AuthServiceService) {
  }

  ngOnInit() {
  }

  /**
   * fait la demande d’authentification, si une erreur revient elle renseigne le message d’erreur
   * @param identifiant identifiant de l’utilisateur.
   * @param password mot de passe de l’utilisateur.
   */
  authentification(identifiant: string, password: string) {
    this.authService.authentification(identifiant, password).subscribe(() => {}, () => this.messageError = 'Connexion impossible');
  }

}
