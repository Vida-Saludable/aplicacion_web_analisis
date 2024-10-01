import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IndicatorByProject } from '../models/indicatorByProyect.model';

import { HabitsByDates } from '../models/Habit.model';
import { DatesStartEnd } from '../models/DatesStartEnd.model';
import { HealthStatistics } from '../models/indicatorByUser.model';


@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private apiUlr= environment.baseHealthy
  private http=inject(HttpClient)
  
  

  getProjectHealthIndicators(proyectoId: number):Observable<IndicatorByProject>{
    return this.http.get<IndicatorByProject>(`${this.apiUlr}indicadores-salud-por-proyectos/${proyectoId}`);
  }



  getUserHealthIndicators(userId: number): Observable<HealthStatistics> {
    return this.http.get<HealthStatistics>(`${this.apiUlr}indicadores-salud-por-usuario/${userId}`);
  }


  getUsersHabitsByDates(usuarioId: number, startDate: string, endDate: string):Observable<HabitsByDates>{
    const url = `${this.apiUlr}indicadores-habitos-por-usuario/${usuarioId}/`;

     // Parámetros de consulta (query params)
     const params = new HttpParams()
     .set('start_date', startDate)
     .set('end_date', endDate);
  return this.http.get<HabitsByDates>(url, { params });
}   

  getDateRange(userId:number):Observable<DatesStartEnd>{
    return this.http.get<DatesStartEnd>(`${this.apiUlr}fechas-min-max/${userId}`);
  }


}
