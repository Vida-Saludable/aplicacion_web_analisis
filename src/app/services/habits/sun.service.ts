import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClasificationSun, SunUnique } from 'src/app/models/habits/sun.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class SunService {
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

  // Obtener datos únicos de exposición al sol
  getSunUnique(): Observable<SunUnique> {
    return this.http.get<SunUnique>(`${this.baseUrl}sol-unicos`);
  }

  // Obtener clasificación de usuarios de exposición al sol con filtros opcionales
  getClasificationSun(filtros: {
    tiempo?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
  }): Observable<ClasificationSun> {
    const params = this.buildParams(filtros);
    return this.http.get<ClasificationSun>(`${this.baseUrl}clasificacion-sol-usuarios`, { params });
  }

  // Exportar clasificación de usuarios de exposición al sol a Excel
  exportClasificationSunExcel(filtros: {
    tiempo?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
  }): Observable<Blob> {
    const params = this.buildParams(filtros);
    return this.http.get(`${this.baseUrl}clasificacion-sol-usuarios-excel`, {
      params,
      responseType: 'blob',
    });
  }
}
