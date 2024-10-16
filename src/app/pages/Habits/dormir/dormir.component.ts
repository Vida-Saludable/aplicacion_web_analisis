import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SleepUnique, ClasificationSleep, ClasificationSleepUsers } from 'src/app/models/habits/sleep.model'; 
import { MessageService } from 'primeng/api';
import { SleepService } from 'src/app/services/habits/sleep.service';

@Component({
  selector: 'app-dormir',
  templateUrl: './dormir.component.html',
  styleUrls: ['./dormir.component.scss'],
})
export class DormirComponent implements OnInit {
  filtersForm: FormGroup;
  horasDormir: { label: string, value: string }[] = [];  
  fechaMinima!: Date;
  fechaMaxima!: Date;
  usuarios: ClasificationSleepUsers[] = [];
  usuariosFiltrados: ClasificationSleepUsers[] = [];
  messages: any[] = [];

  constructor(private fb: FormBuilder, private sleepService: SleepService, private messageService: MessageService) {
    this.filtersForm = this.fb.group({
      hora: [null],
      fecha_inicio: [null],
      fecha_fin: [null],
    });
  }

  ngOnInit(): void {
    // Cargar los datos únicos de la API
    this.sleepService.getSleepUnique().subscribe((data: SleepUnique) => {
      this.horasDormir = data.hora.map((h: string) => ({ label: h, value: h }));
      this.fechaMinima = new Date(data.fecha_minima);
      this.fechaMaxima = new Date(data.fecha_maxima);
    });
  }

  // Método para buscar los usuarios según los filtros aplicados
  buscarUsuarios(): void {
    const filtros = this.filtersForm.value;

    if (new Date(filtros.fecha_inicio) > new Date(filtros.fecha_fin)) {
      // Mostrar alerta si la fecha de inicio es mayor que la fecha de fin
      this.messages = [
        { severity: 'warn', summary: 'Advertencia', detail: 'La fecha de inicio no puede ser mayor a la fecha de fin.' }
      ];
      return;
    }

    this.sleepService.getClasificationSleep({
      hora: filtros.hora,
      fecha_inicio: filtros.fecha_inicio ? this.formatDate(filtros.fecha_inicio) : undefined,
      fecha_fin: filtros.fecha_fin ? this.formatDate(filtros.fecha_fin) : undefined,
    }).subscribe((data: ClasificationSleep) => {
      this.usuarios = data.usuarios;
      this.usuariosFiltrados = this.usuarios; 
      this.messages = []; // Limpiamos los mensajes cuando la búsqueda es exitosa
    });
  }


  exportarExcel(): void {
    const filtros = this.filtersForm.value;

    this.sleepService.exportClasificationSleepExcel({
      hora: filtros.hora,
      fecha_inicio: filtros.fecha_inicio ? this.formatDate(filtros.fecha_inicio) : undefined,
      fecha_fin: filtros.fecha_fin ? this.formatDate(filtros.fecha_fin) : undefined,
    }).subscribe((data: Blob) => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'reporte_consumo_dormir.xlsx';
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
