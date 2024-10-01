import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.modet';

import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  filteredCards: Project[] = [];
  paginatedCards: Project[] = [];
  rows: number = 6;  // Mostrar 6 tarjetas por página
  page: number = 0;
  startDate: Date | null = null;
  endDate: Date | null = null;
  searchQuery: string = '';

  private project$=inject(ProjectService)

  ngOnInit() {
    this.getAllProject()

    
  }
  
  getAllProject(){
    this.project$.getAllProjects().subscribe(response=> {
      console.log(response)
      this.projects=response
      this.filteredCards = [...this.projects];
      this.updatePaginatedCards();
    } )
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
