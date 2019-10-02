import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConnexionGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthServiceService) { }

  /**
   * verifie si l’utilisateur est connecté, si il l’est le gardien laisse passé, sinon il est redirigé sur /login
   * @param route ActivatedRouteSnapshot
   * @param state RouterStateSnapshot
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable< boolean|UrlTree> {
    // retourne `true` si l'utilisateur est connecté ou redirige vers la page de /login

    return this.authService.isLoggedIn().pipe(
      map(() => true)
      , catchError(() => of(this.router.parseUrl('/login'))));
    }


  }

