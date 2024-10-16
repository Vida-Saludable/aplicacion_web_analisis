import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClasificationHope, HopeUnique } from 'src/app/models/habits/hope.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class HopeService {
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

  // Obtener datos únicos de esperanza
  getHopeUnique(): Observable<HopeUnique> {
    return this.http.get<HopeUnique>(`${this.baseUrl}esperanza-unicos`);
  }

  // Obtener clasificación de usuarios de esperanza con filtros opcionales
  getClasificationHope(filtros: {
    tipo_practica?: string;
    fecha?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
  }): Observable<ClasificationHope> {
    const params = this.buildParams(filtros);
    return this.http.get<ClasificationHope>(`${this.baseUrl}clasificacion-esperanza-usuarios`, { params });
  }

  // Exportar clasificación de usuarios de esperanza a Excel
  exportClasificationHopeExcel(filtros: {
    tipo_practica?: string;
    fecha?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
  }): Observable<Blob> {
    const params = this.buildParams(filtros);
    return this.http.get(`${this.baseUrl}clasificacion-esperanza-usuarios-excel`, {
      params,
      responseType: 'blob',
    });
  }
}
