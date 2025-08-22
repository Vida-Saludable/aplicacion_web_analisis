import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WaterUnique} from 'src/app/models/habits/water.model';
import { PaginatedResponse } from 'src/app/models/pager/pager';
import { ProfileUser } from 'src/app/models/profileUser';
import { WaterService } from 'src/app/services/habits/water.service';

@Component({
  selector: 'app-agua',
  templateUrl: './agua.component.html',
  styleUrls: ['./agua.component.scss']
})
export class AguaComponent implements OnInit {
  filtersForm: FormGroup;
  horasAguaOptions: { label: string, value: string }[] = [];
  cantidadAguaOptions: { label: string, value: number }[] = [];
  filteredHorasAgua: { label: string, value: string }[] = [];
  filteredCantidadAgua: { label: string, value: number }[] = [];
  fechaMinima!: Date;
  fechaMaxima!: Date;
  loading: boolean = false;
  usuarios: ProfileUser[] = [];
  usuariosFiltrados: ProfileUser[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  messages: any[] = [];  // Para mensajes de advertencia

  constructor(private fb: FormBuilder, private waterService: WaterService) {
    this.filtersForm = this.fb.group({
      hora: [null],
      cantidad: [null],
      fecha_inicio: [null],
      fecha_fin: [null],
    });
  }

  ngOnInit(): void {
    this.loadUniqueData();
    this.buscarUsuarios()
    
  }

  // Cargar datos únicos de la API
  loadUniqueData(): void {
    this.waterService.getWaterUnique().subscribe((data: WaterUnique) => {
      this.horasAguaOptions = data.horas.map((hora: string) => ({ label: hora, value: hora }));
      this.cantidadAguaOptions = data.cantidades.map((cantidad: number) => ({ label: `${cantidad} ml`, value: cantidad }));
      this.fechaMinima = new Date(data.fecha_minima);
      this.fechaMaxima = new Date(data.fecha_maxima);
          this.filtersForm.patchValue({
      fecha_inicio: new Date(data.fecha_minima),
      fecha_fin: new Date(data.fecha_maxima)
    });
    });
  }

    // Filtrar opciones de "Hora del Consumo" en base a la entrada del usuario
    filterHorasAgua(event: any): void {
      const query = event.query.toLowerCase();
      this.filteredHorasAgua = this.horasAguaOptions.filter(option => 
        option.label.toLowerCase().includes(query)
      );
    }
  
    // Filtrar opciones de "Cantidad" en base a la entrada del usuario
    filterCantidadAgua(event: any): void {
      const query = event.query.toLowerCase();
      this.filteredCantidadAgua = this.cantidadAguaOptions.filter(option => 
        option.label.toLowerCase().includes(query)
      );
    }

  // Método para buscar los usuarios según los filtros aplicados y la paginación
  buscarUsuarios(): void {
    const filtros = this.filtersForm.value;
    if (new Date(filtros.fecha_inicio) > new Date(filtros.fecha_fin)) 
      {
      this.messages = [{ severity: 'warn', 
        summary: 'Advertencia', 
        detail: 'La fecha de inicio no puede ser mayor a la fecha de fin.' }];
      return;
    }

    this.loading = true;
    this.waterService.getClasificationWater({
      hora: filtros.hora?.value,
      cantidad: filtros.cantidad?.value,
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

  onPageChange(event: any): void {
    if (event.page !== undefined && event.rows !== undefined) {
      this.currentPage = event.page + 1; 
      this.pageSize = event.rows; 
      this.buscarUsuarios();
    } else {
      console.error("El evento de paginación no contiene los valores esperados.");
    }
  }

  exportarExcel(): void {
    const filtros = this.filtersForm.value;
    this.waterService.exportToExcel({
      hora: filtros.hora.value,
      cantidad: filtros.cantidad.value,
      fecha_inicio: filtros.fecha_inicio ? this.formatDate(filtros.fecha_inicio) : undefined,
      fecha_fin: filtros.fecha_fin ? this.formatDate(filtros.fecha_fin) : undefined,
    }).subscribe((data: Blob) => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'reporte_consumo_agua.xlsx';
      link.click();
    });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  filtrarUsuarios(event: Event): void {
    const valor = (event.target as HTMLInputElement).value.toLowerCase();
    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.nombres_apellidos.toLowerCase().includes(valor)
    );
  }
}
