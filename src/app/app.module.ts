import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Directive } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { FormulaireAnalyseComponent } from './analyse/formulaire-analyse/formulaire-analyse.component';
import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbDatepickerModule,
  NgbTypeaheadModule
} from "@ng-bootstrap/ng-bootstrap";
import { CourbeAnalyseComponent } from './analyse/courbe-analyse/courbe-analyse.component';
import { SousLaCarteComponent } from './accueil/sous-la-carte/sous-la-carte.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailValidatorDirective,
    AccueilComponent,
    CarteComponent,
    AnalyseComponent,
    CompteComponent,
    FormulaireAnalyseComponent,
    CourbeAnalyseComponent,
    SousLaCarteComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    IconsModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,

  ],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}],
  bootstrap: [AppComponent]
})
export class AppModule { }
