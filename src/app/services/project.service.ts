import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Project } from '../models/project.modet';
import { Patient } from '../models/patient.model';
import { ProjectUser } from '../models/projectUser.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private apiUrl = environment.baseUsers + 'proyectos/';
  private apiUrlProyectos = environment.baseUsers + 'usuario-proyectos/';
  private http = inject(HttpClient);
  userslist: Patient[] = [];

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}`);
  }
  getAllProjectsUsers(): Observable<ProjectUser[]> {
    return this.http.get<ProjectUser[]>(`${this.apiUrlProyectos}`);
  }

  getProjectById(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}${projectId}`);
  }

 deleteProject(projectId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}${projectId}/`); // <-- barra final
}

  // Ahora recibe STRINGS 'YYYY-MM-DD' para fecha_inicio/fecha_fin
  registerProject(
    nombre: string,
    descripcion: string,
    fecha_inicio: string,
    fecha_fin: string,
    estado: number
  ): Observable<Project> {
    const body = { nombre, descripcion, fecha_inicio, fecha_fin, estado };
    return this.http.post<Project>(this.apiUrl, body);
  }

  // Update con payload flexible (solo lo que cambias)
  updateProject(id: number, project: Partial<Project> | any): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}${id}/`, project);
  }
}
