import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HopeService } from 'src/app/services/habits/hope.service';
import { HopeUnique, ClasificationHope, ClasificationHopeUsers } from 'src/app/models/habits/hope.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-esperanza',
  templateUrl: './esperanza.component.html',
  styleUrls: ['./esperanza.component.scss'],
})
export class EsperanzaComponent implements OnInit {
  filtersForm: FormGroup;
  tipoPracticaOptions: { label: string, value: string }[] = [];
  fechasOptions: { label: string, value: string }[] = [];
  fechaMinima!: Date;
  fechaMaxima!: Date;
  usuarios: ClasificationHopeUsers[] = [];
  usuariosFiltrados: ClasificationHopeUsers[] = [];
  messages: any[] = [];  // Para las alertas

  constructor(private fb: FormBuilder, private hopeService: HopeService, private messageService: MessageService) {
    // Inicialización del formulario con los campos correspondientes
    this.filtersForm = this.fb.group({
      tipo_practica: [null],
      fecha: [null],
      fecha_inicio: [null],
      fecha_fin: [null],
    });
  }

  ngOnInit(): void {
    // Cargar los datos únicos de la API
    this.hopeService.getHopeUnique().subscribe((data: HopeUnique) => {
      // Asignar los valores únicos de la API a las opciones de dropdown
      this.tipoPracticaOptions = data.tipo_practica.map((tipo) => ({ label: tipo, value: tipo }));
      this.fechasOptions = data.fecha.map((fecha) => ({ label: fecha, value: fecha }));

      // Asignar las fechas mínima y máxima al calendario
      this.fechaMinima = new Date(data.fecha_minima);
      this.fechaMaxima = new Date(data.fecha_maxima);
    });
  }

  // Método para capturar el valor seleccionado en los dropdowns
  onDropdownChange(event: any, controlName: string): void {
    this.filtersForm.patchValue({ [controlName]: event.value });
  }

  // Método para buscar los usuarios según los filtros aplicados
  buscarUsuarios(): void {
    const filtros = this.filtersForm.value;

    // Validación: la fecha de inicio no puede ser mayor que la fecha de fin
    if (new Date(filtros.fecha_inicio) > new Date(filtros.fecha_fin)) {
      this.messages = [{ severity: 'warn', summary: 'Advertencia', detail: 'La fecha de inicio no puede ser mayor a la fecha de fin.' }];
      return;
    }

    // Realizar la búsqueda con los filtros
    this.hopeService.getClasificationHope({
      tipo_practica: filtros.tipo_practica,
      fecha: filtros.fecha,
      fecha_inicio: filtros.fecha_inicio ? this.formatDate(filtros.fecha_inicio) : undefined,
      fecha_fin: filtros.fecha_fin ? this.formatDate(filtros.fecha_fin) : undefined,
    }).subscribe((data: ClasificationHope) => {
      this.usuarios = data.usuarios;  // Asignación de los datos de usuarios a la tabla
      this.usuariosFiltrados = this.usuarios; 
      this.messages = [];  // Limpiar los mensajes en caso de éxito
    });
  }


  exportarExcel(): void{
    const filtros = this.filtersForm.value;
    this.hopeService.exportClasificationHopeExcel({
      tipo_practica: filtros.tipo_practica,
      fecha: filtros.fecha,
      fecha_inicio: filtros.fecha_inicio ? this.formatDate(filtros.fecha_inicio) : undefined,
      fecha_fin: filtros.fecha_fin ? this.formatDate(filtros.fecha_fin) : undefined,
    }).subscribe((data: Blob) => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'reporte_consumo_esperanza.xlsx';
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
