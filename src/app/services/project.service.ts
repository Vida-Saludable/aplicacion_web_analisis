import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Project } from '../models/project.modet';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = environment.baseUsers + 'proyectos/';
  private http = inject(HttpClient);
  userslist: Patient[] = [];

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}`);
  }

  getProjectById(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}${projectId}`);
  }

  deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${projectId}`);
  }

  registerProject(nombre: string, descripcion: string, fecha_inicio: Date, fecha_fin: Date, estado: number): Observable<Project> {
    const body = { nombre, descripcion, fecha_inicio, fecha_fin, estado };
    return this.http.post<Project>(this.apiUrl, body);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}${id}/`, project);
  }
  
}
