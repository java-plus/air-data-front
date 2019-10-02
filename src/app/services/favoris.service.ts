import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})


const URL_BACKEND = environment.backendUrl;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};


export class FavorisService {



  constructor(private authService: AuthServiceService) { }


  enregistrerFavori() {

  }

  supprimerFavori() {

  }

  modifierFavori() { }

}
