import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import { CorrelationHealthyHabistDeltas, } from '../models/correlationshealthyhabitsdeltas.mode';
import { CorrelationHealthyHabits } from '../models/correlationshealthyhabits.model';

@Injectable({
  providedIn: 'root'
})
export class CorrelationHealthHabitsService {

  private apiUlr= environment.baseHealthy
  private http=inject(HttpClient)

  
  getCorrelationHealthyVsHabits(variableX: string, variableY: string, tipo: string): Observable<CorrelationHealthyHabits> {
    const url = `${this.apiUlr+'correlations-health-habits/'}?variable_x=${variableX}&variable_y=${variableY}&tipo=${tipo}`;
    return this.http.get<CorrelationHealthyHabits>(url);
  }

    
  getCorrelationHealthyVsHabitsDeltas(variableX: string, variableY: string,  tipoX: string,  tipoY: string): Observable<CorrelationHealthyHabistDeltas> {
    const url = `${this.apiUlr+'correlations-health-habits-deltas/'}?variable_x=${variableX}&variable_y=${variableY}&tipo_inicial=${tipoX}&tipo_final=${tipoY}`;
    return this.http.get<CorrelationHealthyHabistDeltas>(url);
  }


}
