import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExerciseUnique, ClasificationExercise, ClasificationExerciseUsers } from 'src/app/models/habits/exercise.model'; 
import { MessageService } from 'primeng/api';
import { ExerciseService } from 'src/app/services/habits/exercise.service';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.scss'],
})
export class EjercicioComponent implements OnInit {
  filtersForm: FormGroup;
  tiposEjercicio: { label: string, value: string }[] = [];
  tiemposEjercicio: { label: string, value: number }[] = [];
  fechaMinima!: Date;
  fechaMaxima!: Date;
  usuarios: ClasificationExerciseUsers[] = [];
  usuariosFiltrados: ClasificationExerciseUsers[] = [];
  messages: any[] = [];

  constructor(private fb: FormBuilder, private exerciseService: ExerciseService, private messageService: MessageService) {
    this.filtersForm = this.fb.group({
      tipo: [null],
      tiempo: [null],
      fecha_inicio: [null],
      fecha_fin: [null],
    });
  }

  ngOnInit(): void {
    // Cargar los datos únicos de la API
    this.exerciseService.getExerciseUnique().subscribe((data: ExerciseUnique) => {
      this.tiposEjercicio = data.tipo.map((t: string) => ({ label: t, value: t }));
      this.tiemposEjercicio = data.tiempo.map((t: number) => ({ label: `${t} min`, value: t }));
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

    this.exerciseService.getClasificationExercise({
      tipo: filtros.tipo,
      tiempo: filtros.tiempo,
      fecha_inicio: filtros.fecha_inicio ? this.formatDate(filtros.fecha_inicio) : undefined,
      fecha_fin: filtros.fecha_fin ? this.formatDate(filtros.fecha_fin) : undefined,
    }).subscribe((data: ClasificationExercise) => {
      this.usuarios = data.usuarios;
      this.usuariosFiltrados = this.usuarios; 
      this.messages = []; // Limpiamos los mensajes cuando la búsqueda es exitosa
    });
  }

  
  exportarExcel(): void {
    const filtros = this.filtersForm.value;
    this.exerciseService.exportClasificationExerciseExcel({
      tipo: filtros.tipo,
      tiempo: filtros.tiempo,
      fecha_inicio: filtros.fecha_inicio ? this.formatDate(filtros.fecha_inicio) : undefined,
      fecha_fin: filtros.fecha_fin ? this.formatDate(filtros.fecha_fin) : undefined,
    }).subscribe((data: Blob) => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'reporte_consumo_ejercicio.xlsx';
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
