import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Project } from '../models/project.modet';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = environment.baseUsers + 'proyectos/';
  private http = inject(HttpClient);

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}`);
  }
}
