import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Roles } from '../models/roles.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiUlr= environment.baseUsers+'roles/'
  private http=inject(HttpClient)
  
  getRoles():Observable<Roles[]>{
    return this.http.get<Roles[]>(`${this.apiUlr}`);
  }
}
