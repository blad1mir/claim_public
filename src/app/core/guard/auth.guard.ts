import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Ajusta la ruta según la ubicación real de tu servicio
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean {
      if (this.authService.isAuthenticated()) {
        // El usuario está autenticado, permite el acceso a la ruta
        return true;
      } else {
        // El usuario no está autenticado, redirige a la página de inicio de sesión
        this.router.navigate(['/login']);
        return false;
      }
    }
  }
