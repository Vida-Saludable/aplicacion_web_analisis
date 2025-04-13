import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FoodService } from 'src/app/services/habits/food.service';
import { FoodUnique } from 'src/app/models/habits/food.model';
import { MessageService } from 'primeng/api';
import { ProfileUser } from 'src/app/models/profileUser';
import { PaginatedResponse } from 'src/app/models/pager/pager';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styleUrls: ['./alimentos.component.scss'],
})
export class AlimentosComponent implements OnInit {
  filtersForm: FormGroup;
  desayunoHoras: { label: string, value: string }[] = [];
  almuerzoHoras: { label: string, value: string }[] = [];
  cenaHoras: { label: string, value: string }[] = [];
  filteredDesayunoHoras: { label: string, value: string }[] = [];
  filteredAlmuerzoHoras: { label: string, value: string }[] = [];
  filteredCenaHoras: { label: string, value: string }[] = [];
  desayunoOptions: { label: string, value: number }[] = [];
  almuerzoOptions: { label: string, value: number }[] = [];
  cenaOptions: { label: string, value: number }[] = [];
  desayunoSaludableOptions: { label: string, value: number }[] = [];
  almuerzoSaludableOptions: { label: string, value: number }[] = [];
  cenaSaludableOptions: { label: string, value: number }[] = [];
  fechaMinima!: Date;
  fechaMaxima!: Date;
  usuarios: ProfileUser[] = [];
  usuariosFiltrados: ProfileUser[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  loading: boolean = false;
  messages: any[] = [];

  constructor(private fb: FormBuilder, private foodService: FoodService, private messageService: MessageService) {
    // Inicialización del formulario
    this.filtersForm = this.fb.group({
      desayuno_hora: [null],
      almuerzo_hora: [null],
      cena_hora: [null],
      desayuno: [null],
      almuerzo: [null],
      cena: [null],
      desayuno_saludable: [null],
      almuerzo_saludable: [null],
      cena_saludable: [null],
      fecha_inicio: [null],
      fecha_fin: [null],
    });
  }

  ngOnInit(): void {
    // Cargar datos únicos de la API
    this.foodService.getFoodUnique().subscribe((data: FoodUnique) => {
      // Asignación de datos únicos a las listas de dropdowns
      this.desayunoHoras = data.desayuno_hora.map((hora) => ({ label: hora, value: hora }));
      this.almuerzoHoras = data.almuerzo_hora.map((hora) => ({ label: hora, value: hora }));
      this.cenaHoras = data.cena_hora.map((hora) => ({ label: hora, value: hora }));

      this.desayunoOptions = data.desayuno.map((val) => ({ label: val ? 'Sí' : 'No', value: val }));
      this.almuerzoOptions = data.almuerzo.map((val) => ({ label: val ? 'Sí' : 'No', value: val }));
      this.cenaOptions = data.cena.map((val) => ({ label: val ? 'Sí' : 'No', value: val }));

      this.desayunoSaludableOptions = data.desayuno_saludable.map((val) => ({ label: val ? 'Sí' : 'No', value: val }));
      this.almuerzoSaludableOptions = data.almuerzo_saludable.map((val) => ({ label: val ? 'Sí' : 'No', value: val }));
      this.cenaSaludableOptions = data.cena_saludable.map((val) => ({ label: val ? 'Sí' : 'No', value: val }));

      // Fechas mínimas y máximas para el calendario
      this.fechaMinima = new Date(data.fecha_minima);
      this.fechaMaxima = new Date(data.fecha_maxima);
    });
  }

  // Métodos para filtrar las opciones de cada hora
  filterDesayunoHoras(event: any): void {
    const query = event.query.toLowerCase();
    this.filteredDesayunoHoras = this.desayunoHoras.filter(option => option.label.toLowerCase().includes(query));
  }

  filterAlmuerzoHoras(event: any): void {
    const query = event.query.toLowerCase();
    this.filteredAlmuerzoHoras = this.almuerzoHoras.filter(option => option.label.toLowerCase().includes(query));
  }

  filterCenaHoras(event: any): void {
    const query = event.query.toLowerCase();
    this.filteredCenaHoras = this.cenaHoras.filter(option => option.label.toLowerCase().includes(query));
  }

  // Método para capturar el valor seleccionado en los dropdowns
  onDropdownChange(event: any, controlName: string): void {
    this.filtersForm.patchValue({ [controlName]: event.value });
  }

  // Método para buscar los usuarios según los filtros aplicados
  buscarUsuarios(): void {
    const filtros = this.filtersForm.value;

    if (new Date(filtros.fecha_inicio) > new Date(filtros.fecha_fin)) {
      this.messages = [{ severity: 'warn', summary: 'Advertencia', detail: 'La fecha de inicio no puede ser mayor a la fecha de fin.' }];
      return;
    }

    this.loading = true;
    this.foodService.getClasificationFood({
      desayuno_hora: filtros.desayuno_hora.value,
      almuerzo_hora: filtros.almuerzo_hora.value,
      cena_hora: filtros.cena_hora.value,
      desayuno: filtros.desayuno,
      almuerzo: filtros.almuerzo,
      cena: filtros.cena,
      desayuno_saludable: filtros.desayuno_saludable,
      almuerzo_saludable: filtros.almuerzo_saludable,
      cena_saludable: filtros.cena_saludable,
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

  
  exportarExcel(): void {
    const filtros = this.filtersForm.value;
    // Realizar la búsqueda con los filtros
    this.foodService.exportClasificationFoodExcel({
      desayuno_hora: filtros.desayuno_hora.value,
      almuerzo_hora: filtros.almuerzo_hora.value,
      cena_hora: filtros.cena_hora.value,
      desayuno: filtros.desayuno,
      almuerzo: filtros.almuerzo,
      cena: filtros.cena,
      desayuno_saludable: filtros.desayuno_saludable,
      almuerzo_saludable: filtros.almuerzo_saludable,
      cena_saludable: filtros.cena_saludable,
      fecha_inicio: filtros.fecha_inicio ? this.formatDate(filtros.fecha_inicio) : undefined,
      fecha_fin: filtros.fecha_fin ? this.formatDate(filtros.fecha_fin) : undefined,
    }).subscribe((data: Blob) => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'reporte_consumo_alimentos.xlsx';
        link.click();
    });
  }

  // Método para formatear las fechas antes de enviarlas a la API
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
