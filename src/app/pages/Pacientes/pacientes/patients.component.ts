import { Component, inject, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-seguimiento-usuarios',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  private userService = inject(UserService);

  userslist: Patient[] = [];
  loading: boolean = true;
  projectId: number;

  // Variables para la paginación
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;

  ngOnInit(): void {
    this.getProjectFromLocalStorage();
    this.getUsersbyProject(this.projectId, this.currentPage, this.pageSize);
  }

  getProjectFromLocalStorage(): void {
    const proyecto = localStorage.getItem('projectId');
    if (proyecto) {
      this.projectId = parseInt(proyecto);
    } else {
      console.error('No hay proyecto seleccionado');
    }
  }

  // Método para obtener los usuarios con paginación
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
    if (event.page !== undefined && event.rows !== undefined) {
      this.currentPage = event.page + 1; 
      this.pageSize = event.rows; 

      this.getUsersbyProject(this.projectId, this.currentPage, this.pageSize);
    } else {
      console.error("El evento de paginación no contiene los valores esperados.");
    }
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
