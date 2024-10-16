import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SunUnique, ClasificationSunUsers } from 'src/app/models/habits/sun.model';
import { SunService } from 'src/app/services/habits/sun.service';

@Component({
  selector: 'app-sol',
  templateUrl: './sol.component.html',
  styleUrls: ['./sol.component.scss']
})
export class SolComponent implements OnInit {
  filtersForm: FormGroup;
  tiemposSolOptions: { label: string, value: number }[] = [];
  fechaMinima!: Date;
  fechaMaxima!: Date;
  usuarios: ClasificationSunUsers[] = [];
  usuariosFiltrados: ClasificationSunUsers[] = [];
  messages: any[] = [];  // Para mensajes de advertencia

  constructor(private fb: FormBuilder, private sunService: SunService) {
    this.filtersForm = this.fb.group({
      tiempo: [null],
      fecha_inicio: [null],
      fecha_fin: [null],
    });
  }

  ngOnInit(): void {
    // Cargar los datos únicos de la API
    this.sunService.getSunUnique().subscribe((data: SunUnique) => {
      this.tiemposSolOptions = data.tiempo.map((t: number) => ({ label: `${t} min`, value: t }));
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

    this.sunService.getClasificationSun({
      tiempo: filtros.tiempo,
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
    this.sunService.exportClasificationSunExcel({
      tiempo: filtros.tiempo,
      fecha_inicio: filtros.fecha_inicio ? this.formatDate(filtros.fecha_inicio) : undefined,
      fecha_fin: filtros.fecha_fin ? this.formatDate(filtros.fecha_fin) : undefined,
    }).subscribe((data:Blob) => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'reporte_consumo_sol.xlsx';
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
