import { Component } from '@angular/core';
import {AuthServiceService} from './services/auth-service.service';
import {IconsModule} from './icons/icons.module';
import {Observable} from 'rxjs';
import Utilisateur from './model/Utilisateur';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  navbarOpen = false;
  utilisateurSubject = this._authService.subConnecte;

  constructor(private _authService: AuthServiceService, private _router: Router) {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  /**
   * deconnecte l’utilisateur et redirige vers la page de login
   */
  deconnexion() {
    this._authService.deconnexion().subscribe(() => {this._router.navigate(['/login']); });
  }

}
