import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreerFavorisComponent } from './favoris/creer-favoris/creer-favoris.component';
import { ListeFavorisComponent } from './favoris/liste-favoris/liste-favoris.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailValidatorDirective } from './validators/email-validator.directive';
import { AccueilComponent } from './accueil/accueil.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { CarteComponent } from './accueil/carte/carte.component';
import {IconsModule} from './icons/icons.module';
import { AnalyseComponent } from './analyse/analyse.component';
import { CompteComponent } from './compte/compte.component';
import { ModifierFavorisComponent } from './favoris/modifier-favoris/modifier-favoris.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormulaireAnalyseComponent } from './analyse/formulaire-analyse/formulaire-analyse.component';
import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbDatepickerModule,
  NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
import { CourbeAnalyseComponent } from './analyse/courbe-analyse/courbe-analyse.component';
import {ChartsModule} from 'ng2-charts';
import { SousLaCarteComponent } from './accueil/sous-la-carte/sous-la-carte.component';
import { CartePm10Component } from './accueil/carte-pm10/carte-pm10.component';

@NgModule({
  declarations: [
    AppComponent,
    CreerFavorisComponent,
    ListeFavorisComponent,
    LoginComponent,
    EmailValidatorDirective,
    AccueilComponent,
    CarteComponent,
    AnalyseComponent,
    CompteComponent,
    ModifierFavorisComponent,
    FormulaireAnalyseComponent,
    CourbeAnalyseComponent,
    SousLaCarteComponent,
    CartePm10Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    IconsModule,
    NgbModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    ChartsModule
  ],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}],
  bootstrap: [AppComponent]
})
export class AppModule { }
