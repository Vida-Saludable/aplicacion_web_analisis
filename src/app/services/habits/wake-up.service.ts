import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  WakeUpUnique } from 'src/app/models/habits/wake_up.model';
import { PaginatedResponse } from 'src/app/models/pager/pager'; // Importar la interfaz de paginación
import { ProfileUser } from 'src/app/models/profileUser';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class WakeUpService {
  private baseUrl = environment.baseRepots;

  constructor(private http: HttpClient) {}

  // Método genérico para construir HttpParams a partir de filtros opcionales
  private buildParams(filtros: { [key: string]: any }): HttpParams {
    let params = new HttpParams();
    Object.keys(filtros).forEach((key) => {
      if (filtros[key] !== undefined && filtros[key] !== null) {
        params = params.set(key, filtros[key].toString());
      }
    });
    return params;
  }

  // Obtener datos únicos de despertar
  getWakeUpUnique(): Observable<WakeUpUnique> {
    return this.http.get<WakeUpUnique>(`${this.baseUrl}despertar-unicos`);
  }

  // Obtener clasificación de usuarios de despertar con filtros opcionales y paginación
  getClasificationWakeUp(filtros: {
    hora?: string;
    estado?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
    page?: number;
    pageSize?: number;
  }): Observable<PaginatedResponse<ProfileUser>> { // Usar la interfaz PaginatedResponse para el tipo de respuesta
    const params = this.buildParams(filtros);
    return this.http.get<PaginatedResponse<ProfileUser>>(`${this.baseUrl}clasificacion-despertar-usuarios`, { params });
  }

  // Exportar clasificación de usuarios de despertar a Excel
  exportClasificationWakeUpExcel(filtros: {
    hora?: string;
    estado?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
  }): Observable<Blob> {
    const params = this.buildParams(filtros);
    return this.http.get(`${this.baseUrl}clasificacion-despertar-usuarios-excel`, {
      params,
      responseType: 'blob',
    });
  }
}
