import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClasificationExercise, ExerciseUnique } from 'src/app/models/habits/exercise.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
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

  // Obtener datos únicos de ejercicio
  getExerciseUnique(): Observable<ExerciseUnique> {
    return this.http.get<ExerciseUnique>(`${this.baseUrl}ejercicio-unicos`);
  }

  // Obtener clasificación de usuarios de ejercicio con filtros opcionales
  getClasificationExercise(filtros: {
    tipo?: string;
    tiempo?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
  }): Observable<ClasificationExercise> {
    const params = this.buildParams(filtros);
    return this.http.get<ClasificationExercise>(`${this.baseUrl}clasificacion-ejercicio-usuarios`, { params });
  }

  // Exportar clasificación de usuarios de ejercicio a Excel
  exportClasificationExerciseExcel(filtros: {
    tipo?: string;
    tiempo?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
  }): Observable<Blob> {
    const params = this.buildParams(filtros);
    return this.http.get(`${this.baseUrl}clasificacion-ejercicio-usuarios-excel`, {
      params,
      responseType: 'blob',
    });
  }
}
