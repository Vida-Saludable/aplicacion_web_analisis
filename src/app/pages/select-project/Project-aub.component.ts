import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.modet';
import { AuthService } from 'src/app/services/auth/auth.service';

import { ProjectService } from 'src/app/services/project.service';
import { RolesService } from 'src/app/services/roles.service';
import { UserService, UsuarioPersonal } from 'src/app/services/user.service';
import { User } from '../../models/user.model';
import { Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'app-home',
  templateUrl: './project-uab.component.html',
  styleUrls: ['./project-uab.component.scss']
})
export class ProjecUabComponent implements OnInit {
  projects: Project[] = [];
  filteredCards: Project[] = [];
  paginatedCards: Project[] = [];
  rows: number = 6;  // Mostrar 6 tarjetas por página
  page: number = 0;
  startDate: Date | null = null;
  endDate: Date | null = null;
  searchQuery: string = '';
  usuario:UsuarioPersonal 
  userName!: string | null;
  userEmail!: string | null;
  userRole!: string | null;
  userId!: number | null;
  userslist: Patient[] = [];
  totalItems: number = 0;
  pageSize: number = 10000;
  currentPage: number = 1;
  

  private project$=inject(ProjectService)
  private rol=inject(RolesService)
  private userService = inject(UserService);
  constructor(
  private authService: AuthService){

  }

  ngOnInit() {
    
    // this.userName = this.authService.getUserName();
    this.userEmail = this.authService.getUserCorreo();
    this.userRole = this.authService.getUserRole();
    console.log("Wel rol del usuario es",this.userRole)
    this.userId= parseInt(this.authService.getUserid());
    this.obtenerdatosDelUsuario()
    this.getAllProject()
  



    
  }
  
  getAllProject(){
   
    this.project$.getAllProjects().subscribe(response=> {
      console.log(response)
      if(this.userRole=="Admin"){
        console.log("LLega aqui")
        this.projects=response
        this.filteredCards = [...this.projects];
        this.updatePaginatedCards();
      }else
      {
        this.projects=response.filter(p=>p.id==this.usuario.proyectoId)

        this.filteredCards = [...this.projects];
        this.updatePaginatedCards();
      }
     
    } )
  }

  getUsersbyProject(projectId: number, page: number, pageSize: number) {
    this.userService.getPatients(projectId, page, pageSize).subscribe(
      response => {
        this.userslist = response.data;
        this.totalItems = response.totalItems;
        this.pageSize = response.pageSize;
        this.currentPage = response.page;

      },
      error => {
        console.error('Error fetching users', error);
      }
    );
  }


  obtenerdatosDelUsuario(){
    this.userService.getUsuarioPersonal(this.userId).subscribe(user=>{
      console.log("El usuario es ++++",user)
        this.usuario=user
        console.log("El usuario es",this.usuario)
       
    })
  }

  // Método para buscar por nombre
  onSearch(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
    this.applyFilters();
  }

  // Métodos para manejar cambios en las fechas
  onStartDateChange(event: any) {
    this.startDate = event.target.value ? new Date(event.target.value) : null;
  }

  onEndDateChange(event: any) {
    this.endDate = event.target.value ? new Date(event.target.value) : null;
  }

  // Método para aplicar todos los filtros (búsqueda y fechas)
  applyFilters() {
    this.filteredCards = this.projects.filter(project => {
      const matchesSearchQuery = project.nombre.toLowerCase().includes(this.searchQuery);
      const matchesStartDate = this.startDate ? new Date(project.fecha_inicio) >= this.startDate : true;
      const matchesEndDate = this.endDate ? new Date(project.fecha_fin) <= this.endDate : true;

      return matchesSearchQuery && matchesStartDate && matchesEndDate;
    });

    this.updatePaginatedCards();
  }

  // Método para actualizar las tarjetas paginadas
  updatePaginatedCards() {
    const start = this.page * this.rows;
    const end = start + this.rows;
    this.paginatedCards = this.filteredCards.slice(start, end);
  }

  // Método para manejar cambios de página
  paginate(event: any) {
    this.page = event.page;
    this.updatePaginatedCards();
  }

 
}
