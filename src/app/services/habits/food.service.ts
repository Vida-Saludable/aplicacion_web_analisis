import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClasificationFood, FoodUnique } from 'src/app/models/habits/food.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
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

  // Obtener datos únicos de alimentación
  getFoodUnique(): Observable<FoodUnique> {
    return this.http.get<FoodUnique>(`${this.baseUrl}alimentacion-unicos`);
  }

  // Obtener clasificación de usuarios de alimentación con filtros opcionales
  getClasificationFood(filtros: {
    desayuno_hora?: string;
    almuerzo_hora?: string;
    cena_hora?: string;
    desayuno?: number;
    almuerzo?: number;
    cena?: number;
    desayuno_saludable?: number;
    almuerzo_saludable?: number;
    cena_saludable?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
  }): Observable<ClasificationFood> {
    const params = this.buildParams(filtros);
    return this.http.get<ClasificationFood>(`${this.baseUrl}clasificacion-alimentacion-usuarios`, { params });
  }

  // Exportar clasificación de usuarios de alimentación a Excel
  exportClasificationFoodExcel(filtros: {
    desayuno_hora?: string;
    almuerzo_hora?: string;
    cena_hora?: string;
    desayuno?: number;
    almuerzo?: number;
    cena?: number;
    desayuno_saludable?: number;
    almuerzo_saludable?: number;
    cena_saludable?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
  }): Observable<Blob> {
    const params = this.buildParams(filtros);
    return this.http.get(`${this.baseUrl}clasificacion-alimentacion-usuarios-excel`, {
      params,
      responseType: 'blob',
    });
  }
}
