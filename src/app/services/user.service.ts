import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Patient } from '../models/patient.model';
import { User } from '../models/user.model';
import { PaginatedResponse } from '../models/pager/pager';

export interface UsuarioPersonal {
  id: number;
  nombres_apellidos: string;
  sexo: string;
  edad: number;
  estado_civil: string;
  fecha_nacimiento: string; // ISO string: YYYY-MM-DD
  telefono: string;
  ocupacion: string;
  procedencia: string;
  religion: string;
  fecha: string; // ISO string: YYYY-MM-DD
  usuario: number;
  rol?:string;
  proyectoId?:number;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUlr = environment.baseUsers;
  private apiUlrRegister = environment.baseRegister;
  
  private http = inject(HttpClient);
  
   // Método para obtener pacientes con paginación
   getPatients(proyectoId: number, page: number, pageSize: number): Observable<PaginatedResponse<Patient>> {
    return this.http.get<PaginatedResponse<Patient>>(
      `${this.apiUlr}usuarios-de-proyecto/${proyectoId}?page=${page}&pageSize=${pageSize}`
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUlr}usuarios/`);
  }
  
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUlr}usuarios/${userId}`);
  }

  deleteUserById(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUlr}usuarios/${userId}`);
  }

  register(nombre: string, correo: string, contrasenia: string, role: number): Observable<User> {
    const url = `${this.apiUlrRegister}`;
    const body = { nombre, correo, contrasenia, role };
    return this.http.post<User>(url, body);
  }

  updateUser(userId: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUlr}usuarios/${userId}/`, user);
  }

  getUsuarioPersonal(id: number): Observable<UsuarioPersonal> {
    const url = `${this.apiUlr}usuarios-personales/${id}/`;
    return this.http.get<UsuarioPersonal>(url);
  }
}
