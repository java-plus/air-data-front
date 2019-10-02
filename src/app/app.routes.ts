import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { ConnexionGuardService } from './services/connexion-guard.service';
import { AccueilComponent } from './accueil/accueil.component';
import {AnalyseComponent} from './analyse/analyse.component';
import {CompteComponent} from './compte/compte.component';


export const ROUTES: Routes = [
  {path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: '/accueil' },
  { path: '',
  canActivate: [ConnexionGuardService],
  children: [
    { path: 'accueil', component: AccueilComponent },
    { path: 'analyse', component: AnalyseComponent},
    { path: 'compte', component: CompteComponent}

  ]}];
