import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenAccess } from 'src/app/core/models/token.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.baseLogin;

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(correo: string, password: string): Observable<TokenAccess> {
    const url = `${this.apiUrl}`;
    const body = { correo, password };

    return this.http.post<TokenAccess>(url, body).pipe(
      tap((tokenResponse: TokenAccess) => {
        // Almacenar tokens en localStorage
        localStorage.setItem('accessToken', tokenResponse.access);
        localStorage.setItem('refreshToken', tokenResponse.refresh);
        localStorage.setItem('nombreUsuario', tokenResponse.nombre);
        localStorage.setItem('correoUsuario', tokenResponse.correo);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();  // Verifica si el token existe
  }

  logout(): void {
    localStorage.clear();  // Limpia los datos del localStorage al cerrar sesión
  }
}


