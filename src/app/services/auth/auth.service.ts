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
  private apiLogoutUrl = environment.baseLogout;  // URL para cerrar sesión

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(correo: string, password: string): Observable<TokenAccess> {
    const url = `${this.apiUrl}`;
    const body = { correo, password };
  
    return this.http.post<TokenAccess>(url, body).pipe(
      tap((tokenResponse: TokenAccess) => {
        const data = tokenResponse.data;
  
        // Almacenar los valores dentro de sessionStorage
        sessionStorage.setItem('accessToken', data.access);
        sessionStorage.setItem('refreshToken', data.refresh);
        sessionStorage.setItem('nombreUsuario', data.nombre);
        sessionStorage.setItem('correoUsuario', data.correo);
        sessionStorage.setItem('roleUsuario', data.role);
      })
    );
  }

  // Método para cerrar sesión
  logout(): Observable<any> {
    const refreshToken = sessionStorage.getItem('refreshToken');
    const body = { refresh: refreshToken };

    return this.http.post(`${this.apiLogoutUrl}`, body).pipe(
      tap(() => {
        // Limpiar sessionStorage después de cerrar sesión
        sessionStorage.clear();
      })
    );
  }

  // Obtener el rol del usuario
  getUserRole(): string | null {
    return sessionStorage.getItem('roleUsuario');
  }

  // Obtener el nombre del usuario
  getUserName(): string | null {
    return sessionStorage.getItem('nombreUsuario');
  }

  // Obtener el correo del usuario
  getUserCorreo(): string | null {
    return sessionStorage.getItem('correoUsuario');
  }

  // Obtener el token de acceso
  getUser(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getUser();
  }
}
