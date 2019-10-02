import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AfficherFavorisComponent } from './afficher-favoris/afficher-favoris.component';
import { CreerFavorisComponent } from './creer-favoris/creer-favoris.component';
import { ListeFavorisComponent } from './liste-favoris/liste-favoris.component';

@NgModule({
  declarations: [
    AppComponent,
    AfficherFavorisComponent,
    CreerFavorisComponent,
    ListeFavorisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
