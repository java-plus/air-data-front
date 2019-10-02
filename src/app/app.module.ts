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
import { CarteComponent } from './carte/carte.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailValidatorDirective,
    AccueilComponent,
    CarteComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
