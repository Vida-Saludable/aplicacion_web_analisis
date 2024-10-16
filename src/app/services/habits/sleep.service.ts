import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClasificationSleep, SleepUnique } from 'src/app/models/habits/sleep.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class SleepService {
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

  // Obtener datos únicos de sueño
  getSleepUnique(): Observable<SleepUnique> {
    return this.http.get<SleepUnique>(`${this.baseUrl}dormir-unicos`);
  }

  // Obtener clasificación de usuarios de sueño con filtros opcionales
  getClasificationSleep(filtros: {
    hora?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
  }): Observable<ClasificationSleep> {
    const params = this.buildParams(filtros);
    return this.http.get<ClasificationSleep>(`${this.baseUrl}clasificacion-dormir-usuarios`, { params });
  }

  // Exportar clasificación de usuarios de sueño a Excel
  exportClasificationSleepExcel(filtros: {
    hora?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
  }): Observable<Blob> {
    const params = this.buildParams(filtros);
    return this.http.get(`${this.baseUrl}clasificacion-dormir-usuarios-excel`, {
      params,
      responseType: 'blob',
    });
  }
}
