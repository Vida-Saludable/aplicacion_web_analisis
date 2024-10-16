import { Component, OnInit, inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.modet';
import { User } from 'src/app/models/user.model';

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

  pieData: any;
  pieOptions: any;
  barData: any;
  barOptions: any;

  private userService = inject(UserService);
  private projectService = inject(ProjectService);

  ngOnInit(): void {
    this.getUsersAndCountByRoles();
    this.getProjectCount();
    this.setupChartsOptions();
  }

  // Obtener los usuarios y contar cuántos hay por rol
  getUsersAndCountByRoles(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.supervisorCount = users.filter(user => user.role === 2).length;
      this.respSegCount = users.filter(user => user.role === 3).length;
      this.tomDatosCount = users.filter(user => user.role === 4).length;
      this.pacienteCount = users.filter(user => user.role === 5).length;

      // Actualizar el gráfico de pastel con los valores
      this.pieData = {
        labels: ['Supervisores', 'Resp. Seguimiento', 'Tomadores de Datos', 'Pacientes'],
        datasets: [{
          data: [this.supervisorCount, this.respSegCount, this.tomDatosCount, this.pacienteCount],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF7043'],
          hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D', '#FF8A65']
        }]
      };
    });
  }

  // Obtener la cantidad de proyectos y usuarios por proyecto
  getProjectCount(): void {
    this.projectService.getAllProjects().subscribe((projects: Project[]) => {
      this.projectCount = projects.length;
      const projectLabels: string[] = [];
      const usersPerProject: number[] = [];

      projects.forEach(project => {
        projectLabels.push(project.nombre);

        // Llamar al servicio para obtener la cantidad de usuarios por proyecto
        this.userService.getPatients(project.id).subscribe((patients) => {
          usersPerProject.push(patients.length);

          // Actualizar el gráfico de barras con los datos reales de usuarios por proyecto
          this.barData = {
            labels: projectLabels,
            datasets: [
              {
                label: 'Usuarios por Proyecto',
                backgroundColor: '#42A5F5',
                data: usersPerProject
              }
            ]
          };
        });
      });
    });
  }

  // Configurar las opciones para los gráficos
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
        x: {
          beginAtZero: true
        }
      },
      responsive: true
    };
  }
}
