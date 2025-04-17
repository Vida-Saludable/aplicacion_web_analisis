import { Component, OnInit, inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { forkJoin, Observable } from 'rxjs';

import { PaginatedResponse } from 'src/app/models/pager/pager';
import { Project } from 'src/app/models/project.modet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  supervisorCount = 0;
  respSegCount = 0;
  tomDatosCount = 0;
  pacienteCount = 0;
  projectCount = 0;
  admin=0

  pieData: any;
  pieOptions: any;
  barData: any;
  barOptions: any;

  loading: boolean = true; // Variable de estado de carga

  private userService = inject(UserService);
  private projectService = inject(ProjectService);

  ngOnInit(): void {
    this.loadData();
    this.setupChartsOptions();
  }

  // Método para cargar los datos y contar por roles
  loadData(): void {
    this.loading = true;
    
    forkJoin({
      users: this.userService.getUsers(),
      projects: this.projectService.getAllProjects()
    }).subscribe(
      ({ users, projects }) => {
        this.processUsersData(users);
        this.processProjectsData(projects); // Procesar proyectos
        this.loading = false;
      },
      error => {
        console.error('Error al cargar los datos:', error);
        this.loading = false;
      }
    );
  }

  // Procesar los datos de los usuarios y contar por roles
  processUsersData(users: any[]): void {
    console.log("Los usuario",users)
    this.admin= users.filter(user => user.role === 1).length;
    this.supervisorCount = users.filter(user => user.role === 2).length;
    this.respSegCount = users.filter(user => user.role === 3).length;
    this.tomDatosCount = users.filter(user => user.role === 4).length;
    this.pacienteCount = users.filter(user => user.role === 5).length;

    this.pieData = {
      labels: ['Administradores','Supervisores', 'Resp. Seguimiento', 'Tomadores de Datos', 'Pacientes'],
      datasets: [{
        data: [this.admin, this.supervisorCount, this.respSegCount, this.tomDatosCount, this.pacienteCount],
        backgroundColor: ['#25e035','#42A5F5', '#66BB6A', '#FFA726', '#FF7043'],
        hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D', '#FF8A65']
      }]
    };
  }

  // Procesar los datos de los proyectos y configurar el gráfico de barras
  processProjectsData(projects: Project[]): void {
    this.projectCount = projects.length;
    const projectLabels: string[] = [];
    const patientsPerProjectRequests: Observable<PaginatedResponse<any>>[] = [];

    // Crear una solicitud para cada proyecto para obtener el número de pacientes
    projects.forEach(project => {
      projectLabels.push(project.nombre);
      // Solicitar pacientes de cada proyecto sin paginación (ajustamos el pageSize a un número alto)
      patientsPerProjectRequests.push(this.userService.getPatients(project.id, 1, 10000));
    });

    // Ejecutar todas las solicitudes en paralelo
    forkJoin(patientsPerProjectRequests).subscribe((responses) => {
      const patientsPerProject = responses.map(response => response.totalItems); // totalItems indica la cantidad total de pacientes

      // Configurar los datos del gráfico de barras
      this.barData = {
        labels: projectLabels,
        datasets: [{
          label: 'Pacientes por Proyecto',
          backgroundColor: '#42A5F5',
          data: patientsPerProject
        }]
      };
    });
  }

  // Configurar las opciones de los gráficos
  setupChartsOptions(): void {
    this.pieOptions = {
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      responsive: true
    };

    this.barOptions = {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1 // Configura el paso a 1 para facilitar la visualización
          }
        }
      },
      responsive: true
    };
  }
}
