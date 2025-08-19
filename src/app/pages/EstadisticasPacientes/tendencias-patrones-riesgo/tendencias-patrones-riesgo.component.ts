import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/models/patient.model';
import { UserService } from 'src/app/services/user.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { PaginatedResponse } from 'src/app/models/pager/pager';
import { TableCol } from '../indicador-salud-usuario/indicador-salud-usuario.component';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-tendencias-patrones-riesgo',
  templateUrl: './tendencias-patrones-riesgo.component.html',
  styleUrls: ['./tendencias-patrones-riesgo.component.scss']
})
export class TendenciasPatronesRiesgoComponent implements OnInit {
  private userService = inject(UserService);

  // Datos mostrados (filtrados)
  userslist: Patient[] = [];
  // Página cruda tal como llega del backend (sin filtrar)
  private pageBuffer: Patient[] = [];

  loading = true;
  projectId!: number;

  // Paginación
  totalItems = 0;
  pageSize = 10;
  currentPage = 1; // 1-based (API)
  first = 0;       // 0-based (PrimeNG)

  // Filtro client-side sobre la página actual
  filterTerm = '';

  // Definición de columnas para header y para filtrar
  columns: TableCol[] = [
    { field: 'datos_personales.nombres_apellidos', header: 'Nombre' },
    { field: 'correo',                              header: 'Correo' },
    { field: 'datos_personales.telefono',           header: 'Celular' },
    { field: 'datos_personales.edad',               header: 'Edad' },
  ];

  ngOnInit(): void {
    const proyecto = localStorage.getItem('projectId');
    if (proyecto) this.projectId = parseInt(proyecto, 10);
    else console.error('No hay proyecto seleccionado');

    this.fetchPage(this.currentPage, this.pageSize);
  }

  // Paginación/virtual scroll de PrimeNG en modo lazy
  onLazyLoad(event: LazyLoadEvent) {
    const rows  = event.rows  ?? this.pageSize;
    const first = event.first ?? 0;
    const page  = Math.floor(first / rows) + 1;

    this.pageSize    = rows;
    this.currentPage = page;
    this.first       = first;

    this.fetchPage(page, rows);
  }

  private fetchPage(page: number, pageSize: number) {
    this.loading = true;
    this.userService.getPatients(this.projectId, page, pageSize)
      .subscribe({
        next: (resp: PaginatedResponse<Patient>) => {
          // Guarda la página original…
          this.pageBuffer  = resp?.data ?? [];
          // …y aplica el filtro client-side sobre ESTA página
          this.applyClientFilter();

          this.totalItems  = resp?.totalItems ?? this.pageBuffer.length;
          this.pageSize    = resp?.pageSize   ?? pageSize;
          this.currentPage = resp?.page       ?? page;
          this.first       = (this.currentPage - 1) * this.pageSize;
          this.loading     = false;
        },
        error: err => { console.error('Error al obtener usuarios', err); this.loading = false; }
      });
  }

  // Input del buscador (client-side sobre la página actual)
  onFilterInput(value: string) {
    this.filterTerm = (value || '').toLowerCase().trim();
    this.applyClientFilter();
  }

  private applyClientFilter() {
    if (!this.filterTerm) {
      this.userslist = [...this.pageBuffer];
      return;
    }
    this.userslist = this.pageBuffer.filter(row =>
      this.columns.some(col => {
        const val = this.resolveFieldData(row, col.field);
        return (val !== null && val !== undefined)
          ? String(val).toLowerCase().includes(this.filterTerm)
          : false;
      })
    );
  }

  // Resolver campos anidados 'a.b.c'
  resolveFieldData(data: any, field: string): any {
    if (!data || !field) return null;
    if (!field.includes('.')) return data[field];
    return field.split('.').reduce((acc: any, k: string) => acc?.[k], data);
  }
}
