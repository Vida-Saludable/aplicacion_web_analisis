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
  loading: boolean = true;  // Añadimos una variable para el estado de carga
  proyectoId = 1;
  public userId: number | null = null;  // Permitir que userId sea opcional (null)

  constructor() {}

  ngOnInit(): void {
    this.getUsersbyProject(this.proyectoId);

    // Obtener los queryParams y reconstruir el objeto user
    this.activateRoute.queryParams.subscribe(params => {
      this.userId = params['userId'] ? Number(params['userId']) : null;

      if (this.userId) {
        console.log('User ID:', this.userId);
      }
    });
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

  clear(dt: any) {
    dt.clear();  // Limpiamos los filtros
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
