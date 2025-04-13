import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/models/patient.model';
import { UserService } from 'src/app/services/user.service';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-tendencias-patrones-riesgo',
  templateUrl: './tendencias-patrones-riesgo.component.html',
  styleUrls: ['./tendencias-patrones-riesgo.component.scss']
})
export class TendenciasPatronesRiesgoComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  private activateRoute = inject(ActivatedRoute);
  private indicatorByUserService = inject(StatisticsService);

  userslist: Patient[] = [];
  loading: boolean = true;
  projectId: number;
  public userId: number | null = null;

  // Variables para la paginación
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;

  constructor() {}

  ngOnInit(): void {
    this.getProjectFromLocalStorage();
    this.getUsersbyProject(this.projectId, this.currentPage, this.pageSize);

    // Obtener los queryParams y reconstruir el objeto user
    this.activateRoute.queryParams.subscribe(params => {
      this.userId = params['userId'] ? Number(params['userId']) : null;

      if (this.userId) {
        console.log('User ID:', this.userId);
      }
    });
  }

  getProjectFromLocalStorage(): void {
    const proyecto = localStorage.getItem('projectId');
    if (proyecto) {
      this.projectId = parseInt(proyecto);
    } else {
      console.error('No hay proyecto seleccionado');
    }
  }

  getUsersbyProject(projectId: number, page: number, pageSize: number) {
    this.loading = true;
    this.userService.getPatients(projectId, page, pageSize).subscribe(
      response => {
        this.userslist = response.data;
        this.totalItems = response.totalItems;
        this.pageSize = response.pageSize;
        this.currentPage = response.page;
        this.loading = false;
      },
      error => {
        console.error('Error fetching users', error);
        this.loading = false;
      }
    );
  }
  

  onPageChange(event: any): void {
    this.currentPage = event.page + 1; // PrimeNG usa índice basado en 0, por eso sumamos 1
    this.pageSize = event.rows; // Actualizamos el tamaño de la página con el valor seleccionado
    this.getUsersbyProject(this.projectId, this.currentPage, this.pageSize);
  }
  

  navigateToUserStatistics(user: Patient) {
    const targetUrl = `/dashboard/Estadisticas/tendenciaUsuario/${user.id}`;
    this.router.navigate([targetUrl]).then(success => {
      if (success) {
        console.log('Navegación exitosa');
      } else {
        console.log('Fallo en la navegación');
      }
    });
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
