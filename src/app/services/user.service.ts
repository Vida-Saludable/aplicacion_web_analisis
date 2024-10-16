import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Patient } from '../models/patient.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUlr = environment.baseUsers;
  private apiUlrRegister = environment.baseRegister;
  
  private http = inject(HttpClient);
  
  getPatients(proyectoId: number): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUlr}usuarios-de-proyecto/${proyectoId}`);
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
}
