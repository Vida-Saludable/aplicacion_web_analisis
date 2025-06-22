import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AirUnique } from 'src/app/models/habits/air.model';
import { PaginatedResponse } from 'src/app/models/pager/pager';
import { ProfileUser } from 'src/app/models/profileUser';
import { AirService } from 'src/app/services/habits/air.service';

@Component({
  selector: 'app-aire',
  templateUrl: './aire.component.html',
  styleUrls: ['./aire.component.scss'],
})
export class AireComponent implements OnInit {
  filtersForm: FormGroup;
  tiemposAire: { label: string, value: number }[] = [];
  filteredTiemposAire: { label: string, value: number }[] = [];
  fechaMinima!: Date;
  fechaMaxima!: Date;
  usuarios: ProfileUser[] = [];
  usuariosFiltrados: ProfileUser[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  loading: boolean = false;
  messages: any[] = [];

  constructor(private fb: FormBuilder, private airService: AirService) {
    this.filtersForm = this.fb.group({
      tiempo: [null],
      fecha_inicio: [null],
      fecha_fin: [null],
    });
  }

  ngOnInit(): void {
    this.loadUniqueData();
  }

  // Cargar datos únicos de la API
  loadUniqueData(): void {
    this.airService.getAirUnique().subscribe((data: AirUnique) => {
      this.tiemposAire = data.tiempos.map((t: number) => ({ label: `${t} min`, value: t }));
      this.fechaMinima = new Date(data.fecha_minima);
      this.fechaMaxima = new Date(data.fecha_maxima);
          this.filtersForm.patchValue({
      fecha_inicio: new Date(data.fecha_minima),
      fecha_fin: new Date(data.fecha_maxima)
    });
    });
  }

  filterTiempo(event: any): void {
    const query = event.query.toLowerCase();
    this.filteredTiemposAire = this.tiemposAire.filter(option => option.label.toLowerCase().includes(query));
  }

  // Método para buscar los usuarios según los filtros aplicados y la paginación
  buscarUsuarios(): void {
    const filtros = this.filtersForm.value;

    if (new Date(filtros.fecha_inicio) > new Date(filtros.fecha_fin)) {
      this.messages = [{ 
        severity: 'warn', 
        summary: 'Advertencia', 
        detail: 'La fecha de inicio no puede ser mayor a la fecha de fin.' }];
      return;
    }

    this.loading = true;
    this.airService.getClasificationAir({
      tiempo: filtros.tiempo?.value,
      fecha_inicio: filtros.fecha_inicio ? this.formatDate(filtros.fecha_inicio) : undefined,
      fecha_fin: filtros.fecha_fin ? this.formatDate(filtros.fecha_fin) : undefined,
      page: this.currentPage,
      pageSize: this.pageSize,
    }).subscribe((response: PaginatedResponse<ProfileUser>) => {
      this.usuarios = response.data;
      this.totalItems = response.totalItems;
      this.pageSize = response.pageSize;
      this.currentPage = response.page;
      this.usuariosFiltrados = this.usuarios;
      this.loading = false;
      this.messages = [];
    });
  }

  // Manejar el cambio de página
  onPageChange(event: any): void {
    if (event.page !== undefined && event.rows !== undefined) {
      this.currentPage = event.page + 1;
      this.pageSize = event.rows;
      this.buscarUsuarios();
    }
  }

  // Exportar datos a Excel
  exportarExcel(): void {
    const filtros = this.filtersForm.value;
    this.airService.exportClasificationAirExcel({
      tiempo: filtros.tiempo?.value,
      fecha_inicio: filtros.fecha_inicio ? this.formatDate(filtros.fecha_inicio) : undefined,
      fecha_fin: filtros.fecha_fin ? this.formatDate(filtros.fecha_fin) : undefined,
    }).subscribe((data: Blob) => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'reporte_consumo_aire.xlsx';
      link.click();
    });
  }

  // Formato de fecha para enviar a la API
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Método para filtrar usuarios por nombre
  filtrarUsuarios(event: Event): void {
    const valor = (event.target as HTMLInputElement).value.toLowerCase();
    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.nombres_apellidos.toLowerCase().includes(valor)
    );
  }
}
