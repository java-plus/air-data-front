import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { ConnexionGuardService } from './services/connexion-guard.service';
import { AccueilComponent } from './accueil/accueil.component';


export const ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [ConnexionGuardService],
    children: [

      { path: 'accueil', component: AccueilComponent },


    ]
  }];
