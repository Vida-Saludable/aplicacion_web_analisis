import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IndicatorsInitialVsEnd } from '../models/indicatormainvsend.model';


@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private apiUrl = environment.baseHealthy + 'indicadores-salud-iniciales-finales/';
  private http = inject(HttpClient);

  getIndicatorsMainvsEnd(userId: number): Observable<IndicatorsInitialVsEnd[]> {
    return this.http.get<IndicatorsInitialVsEnd[]>(`${this.apiUrl}${userId}`);
  }
}
