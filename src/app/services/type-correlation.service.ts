import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class TypeCorrelationService {
  private apiUlr= environment.baseHealthy+'tipos-correlacion/'
  private http=inject(HttpClient)
  
  getTypesCorrelations():Observable<string[]>{
    return this.http.get<string[]>(`${this.apiUlr}`);
  }
}
