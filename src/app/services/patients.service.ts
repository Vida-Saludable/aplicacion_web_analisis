import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IndicatorsInitialVsEnd } from '../models/indicatormainvsend.model';
import { HistoryHabitsByUser } from '../models/history-habits.model';


@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private apiUrl = environment.baseHealthy;
  private apiUrlFinalEnd = this.apiUrl + 'indicadores-salud-iniciales-finales/';
  private apiUrlHistoriHabits = this.apiUrl + 'indicadores-habitos-por-usuario-seguimiento/';
  private http = inject(HttpClient);

  getIndicatorsMainvsEnd(userId: number): Observable<IndicatorsInitialVsEnd[]> {
    return this.http.get<IndicatorsInitialVsEnd[]>(`${this.apiUrlFinalEnd}${userId}`);
  }

  getHistoryHabitsByUsers(userId: number): Observable<HistoryHabitsByUser[]> {
    return this.http.get<HistoryHabitsByUser[]>(`${this.apiUrlHistoriHabits}${userId}`);
  }
}
