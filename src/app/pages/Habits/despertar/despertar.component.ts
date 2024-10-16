import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WakeUpUnique, ClasificationWakeUpUsers } from 'src/app/models/habits/wake_up.model';
import { WakeUpService } from 'src/app/services/habits/wake-up.service';


@Component({
  selector: 'app-despertar',
  templateUrl: './despertar.component.html',
  styleUrls: ['./despertar.component.scss']
})
export class DespertarComponent implements OnInit {
  filtersForm: FormGroup;
  horasDespertarOptions: { label: string, value: string }[] = [];
  estadoOptions: { label: string, value: number }[] = [];
  fechaMinima!: Date;
  fechaMaxima!: Date;
  usuarios: ClasificationWakeUpUsers[] = [];
  usuariosFiltrados: ClasificationWakeUpUsers[] = [];
  messages: any[] = [];  // Para mensajes de advertencia

  constructor(private fb: FormBuilder, private wakeUpService: WakeUpService) {
    this.filtersForm = this.fb.group({
      hora: [null],
      estado: [null],
      fecha_inicio: [null],
      fecha_fin: [null],
    });
  }

  ngOnInit(): void {
    // Cargar los datos únicos de la API
    this.wakeUpService.getWakeUpUnique().subscribe((data: WakeUpUnique) => {
      this.horasDespertarOptions = data.horas.map((hora: string) => ({ label: hora, value: hora }));
      this.estadoOptions = data.estados.map((estado: number) => ({ label: `${estado}`, value: estado }));
      this.fechaMinima = new Date(data.fecha_minima);
      this.fechaMaxima = new Date(data.fecha_maxima);
    });
  }

  // Método para capturar el valor seleccionado del dropdown
  onDropdownChange(event: any, fieldName: string): void {
    this.filtersForm.patchValue({ [fieldName]: event.value });
  }

  // Método para buscar los usuarios según los filtros aplicados
  buscarUsuarios(): void {
    const filtros = this.filtersForm.value;

    if (new Date(filtros.fecha_inicio) > new Date(filtros.fecha_fin)) {
      // Mostrar mensaje si la fecha de inicio es mayor que la fecha de fin
      this.messages = [{ severity: 'warn', summary: 'Advertencia', detail: 'La fecha de inicio no puede ser mayor a la fecha de fin.' }];
      return;
    }

    this.wakeUpService.getClasificationWakeUp({
      hora: filtros.hora,
      estado: filtros.estado,
      fecha_inicio: filtros.fecha_inicio ? this.formatDate(filtros.fecha_inicio) : undefined,
      fecha_fin: filtros.fecha_fin ? this.formatDate(filtros.fecha_fin) : undefined,
    }).subscribe((data) => {
      this.usuarios = data.usuarios;
      this.usuariosFiltrados = this.usuarios; 
      this.messages = [];  // Limpiar mensajes de advertencia si la búsqueda fue exitosa
    });
  }
  
  exportarExcel(): void {
    const filtros = this.filtersForm.value;
    this.wakeUpService.exportClasificationWakeUpExcel({
      hora: filtros.hora,
      estado: filtros.estado,
      fecha_inicio: filtros.fecha_inicio ? this.formatDate(filtros.fecha_inicio) : undefined,
      fecha_fin: filtros.fecha_fin ? this.formatDate(filtros.fecha_fin) : undefined,
    }).subscribe((data: Blob) => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'reporte_consumo_despertar.xlsx';
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
