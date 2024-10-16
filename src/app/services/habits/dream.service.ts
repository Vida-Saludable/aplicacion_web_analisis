// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { ClasificationDream, DreamUnique } from 'src/app/models/habits/dream.model';
// import { environment } from 'src/environments/environment.prod';


// @Injectable({
//   providedIn: 'root',
// })
// export class DreamService {
//   private baseUrl = environment.baseRepots

//   constructor(private http: HttpClient) {}

//   // Obtener datos únicos de sueño (dormir y despertar)
//   getDreamUnique(): Observable<DreamUnique> {
//     return this.http.get<DreamUnique>(`${this.baseUrl}suenio-unicos`);
//   }

//   // Obtener clasificación de usuarios de sueño con filtros opcionales
//   getClasificationDream(filtros: {
//     hora_dormir?: string,
//      hora_despertar?: string, 
//      fecha_inicio?: string;  // Cambiado de startDate a fecha_inicio
//      fecha_fin?: string;     // Cambiado de endDate a fecha_fin
//     }): Observable<ClasificationDream> {
//     let params = new HttpParams();
//     if (filtros.hora_dormir) {
//       params = params.set('hora_dormir', filtros.hora_dormir);
//     }
//     if (filtros.hora_despertar) {
//       params = params.set('hora_despertar', filtros.hora_despertar);
//     }
//     if (filtros.fecha_inicio) {
//       params = params.set('fecha_inicio', filtros.fecha_inicio);
//     }
//     if (filtros.fecha_fin) {
//       params = params.set('fecha_fin', filtros.fecha_fin);
//     }
//     return this.http.get<ClasificationDream>(`${this.baseUrl}clasificacion-suenio-usuarios`, { params });
//   }
// }
