import { Component, inject, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-indicadores-salud',
  templateUrl: './indicadores-salud-proyecto.component.html',
  styleUrl: './indicadores-salud-proyecto.component.scss'
})
export class IndicadoresSaludProyectoComponent implements OnInit {
  private userService = inject(UserService);

  userslist: Patient[] = [];
  loading: boolean = true;  // Añadimos una variable para el estado de carga
  proyectoId = 1;

  ngOnInit(): void {
    this.getUsersbyProject(this.proyectoId);
  }

  getUsersbyProject(projectId: number) {
    this.userService.getPatients(projectId).subscribe(
      (data: Patient[]) => {
        this.userslist = data;
        this.loading = false;  // Cambiamos el estado de carga cuando los datos son recibidos
      },
      error => {
        console.error('Error fetching users', error);
        this.loading = false;  // Cambiamos el estado de carga incluso si ocurre un error
      }
    );
  }

  clear(dt: any) {
    dt.clear();  // Limpiamos los filtros
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
