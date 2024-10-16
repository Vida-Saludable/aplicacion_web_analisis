import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AirService {
  private baseUrl = `${environment.baseRepots}`;

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

  // Obtener datos únicos de aire
  getAirUnique(): Observable<any> {
    return this.http.get(`${this.baseUrl}aire-unicos`);
  }

  // Obtener clasificación de usuarios de aire con filtros opcionales
  getClasificationAir(filtros: {
    tiempo?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
  }): Observable<any> {
    const params = this.buildParams(filtros);
    return this.http.get(`${this.baseUrl}clasificacion-aire-usuarios`, { params });
  }

  // Exportar clasificación de usuarios de aire a Excel
  exportClasificationAirExcel(filtros: {
    tiempo?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
  }): Observable<Blob> {
    const params = this.buildParams(filtros);
    return this.http.get(`${this.baseUrl}clasificacion-aire-usuarios-excel`, {
      params,
      responseType: 'blob',
    });
  }
}
