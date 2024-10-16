import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WaterUnique, ClasificationWaterUsers } from 'src/app/models/habits/water.model';
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
  fechaMinima!: Date;
  fechaMaxima!: Date;
  usuarios: ClasificationWaterUsers[] = [];
  usuariosFiltrados: ClasificationWaterUsers[] = [];
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
    // Cargar los datos únicos de la API
    this.waterService.getWaterUnique().subscribe((data: WaterUnique) => {
      this.horasAguaOptions = data.horas.map((hora: string) => ({ label: hora, value: hora }));
      this.cantidadAguaOptions = data.cantidades.map((cantidad: number) => ({ label: `${cantidad} ml`, value: cantidad }));
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
      this.messages = [{ severity: 'warn', summary: 'Advertencia', detail: 'La fecha de inicio no puede ser mayor a la fecha de fin.' }];
      return;
    }
    this.waterService.getClasificationWater({
      hora: filtros.hora,
      cantidad: filtros.cantidad,
      fecha_inicio: filtros.fecha_inicio ? this.formatDate(filtros.fecha_inicio) : undefined,
      fecha_fin: filtros.fecha_fin ? this.formatDate(filtros.fecha_fin) : undefined,
    }).subscribe((data) => {
      this.usuarios = data.usuarios;
      this.usuariosFiltrados = this.usuarios; 
      this.messages = [];  // Limpiar mensajes de advertencia si la búsqueda fue exitosa
    });
  }

    // Método para exportar datos a Excel
    exportarExcel(): void {
      const filtros = this.filtersForm.value;
      this.waterService.exportToExcel({
        hora: filtros.hora,
        cantidad: filtros.cantidad,
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
