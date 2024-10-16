import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClasificationWater, WaterUnique } from 'src/app/models/habits/water.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class WaterService {
  private baseUrl = environment.baseRepots;

  constructor(private http: HttpClient) {}

  // Obtener datos únicos de agua
  getWaterUnique(): Observable<WaterUnique> {
    return this.http.get<WaterUnique>(`${this.baseUrl}agua-unicos`);
  }

  // Obtener clasificación de usuarios de agua con filtros opcionales
  getClasificationWater(filtros: {
    hora?: string,
    cantidad?: number,
    fecha_inicio?: string,  // Cambiado de startDate a fecha_inicio
    fecha_fin?: string,     // Cambiado de endDate a fecha_fin
  }): Observable<ClasificationWater> {
    let params = new HttpParams();
    if (filtros.hora) {
      params = params.set('hora', filtros.hora);
    }
    if (filtros.cantidad) {
      params = params.set('cantidad', filtros.cantidad.toString());
    }
    if (filtros.fecha_inicio) {
      params = params.set('fecha_inicio', filtros.fecha_inicio);
    }
    if (filtros.fecha_fin) {
      params = params.set('fecha_fin', filtros.fecha_fin);
    }
    return this.http.get<ClasificationWater>(`${this.baseUrl}clasificacion-agua-usuarios`, { params });
  }

  // Método para exportar datos a Excel
  exportToExcel(filtros: {
    hora?: string,
    cantidad?: number,
    fecha_inicio?: string,  // Cambiado de startDate a fecha_inicio
    fecha_fin?: string,     // Cambiado de endDate a fecha_fin
  }): Observable<Blob> {
    let params = new HttpParams();
    if (filtros.hora) {
      params = params.set('hora', filtros.hora);
    }
    if (filtros.cantidad) {
      params = params.set('cantidad', filtros.cantidad.toString());
    }
    if (filtros.fecha_inicio) {
      params = params.set('fecha_inicio', filtros.fecha_inicio);
    }
    if (filtros.fecha_fin) {
      params = params.set('fecha_fin', filtros.fecha_fin);
    }

    // La solicitud debe especificar 'responseType' como 'blob' para descargar el archivo Excel
    return this.http.get(`${this.baseUrl}clasificacion-agua-usuarios-excel`, {
      params,
      responseType: 'blob',  // Para obtener el archivo como un Blob
    });
  }
}
