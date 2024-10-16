import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'];  // Roles permitidos para la ruta
    const userRole = this.authService.getUserRole();  // Obtener el rol almacenado
  
    // Verificar si el usuario está autenticado y tiene uno de los roles permitidos
    if (this.authService.isAuthenticated() && expectedRoles.includes(userRole)) {
      return true;  // Permitir el acceso
    }
  
    this.router.navigate(['/auth/']);  // Redirigir al login si no cumple los requisitos
    return false;
  }
  
}
