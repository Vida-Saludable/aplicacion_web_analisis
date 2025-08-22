import { Component, inject, OnInit } from '@angular/core';
import { CorrelationHealthyHabits } from 'src/app/models/correlationshealthyhabits.model';
import { CorrelationHealthHabitsService } from 'src/app/services/correlation-health-habits.service';
import { TypeCorrelationService } from 'src/app/services/type-correlation.service';
import { MessageService } from 'primeng/api';
import { Correlaciones } from 'src/app/helpers/objectsCorrelations.ts/data-habits-healthy-clasificate';

@Component({
  selector: 'app-grupo-fisica-grupo-habito',
  templateUrl: './variable-fisica-variable-habito.component.html',
  styleUrls: ['./variable-fisica-variable-habito.component.scss'],
  providers: [MessageService]
})
export class VariableFisicaVariableHabitoComponent implements OnInit {
  selectedDatoCorporal!: string;
  selectedDatoHabito!: string;
  selectedStatus!: string;

  correlationData!: CorrelationHealthyHabits | null;
  typesCorrelations: string[] = [];
  loading = false;
  analisisIntentado = false;

  filteredDatosHabitos: Array<{label:string; value:string}> = [];
  datosCorporalOptions: Array<{label:string; value:string}> = [];

  private firstAutoDone = false; // evita disparos múltiples
  private correlation$ = inject(TypeCorrelationService);
  private messageService = inject(MessageService);

  constructor(private correlationService: CorrelationHealthHabitsService) {}

  ngOnInit(): void {
    // 1) Opciones de "Dato Corporal" (sincrónico desde tu objeto estático)
    this.setDatosCorporalOptions();
    this.tryAutoSelectAndAnalyze();

    // 2) Tipos de correlación (asíncrono)
    this.getTypeCorrelation();
  }

  /** Genera opciones para Dato Corporal */
  setDatosCorporalOptions() {
    this.datosCorporalOptions = Correlaciones.map(c => c.indicador); // [{label,value}]
  }

  /** Carga tipos y luego intenta autoseleccionar y analizar */
  getTypeCorrelation() {
    this.correlation$.getTypesCorrelations().subscribe({
      next: (response) => {
        this.typesCorrelations = response ?? [];
        this.tryAutoSelectAndAnalyze();
      },
      error: () => {
        this.messageService.add({ severity:'error', summary:'Error', detail:'No se pudieron cargar los tipos de correlación.' });
      }
    });
  }

  /** Selecciona el primer valor en todos los combos y lanza el análisis una sola vez */
  private tryAutoSelectAndAnalyze() {
    if (this.firstAutoDone) return;
    const hasCorporal = this.datosCorporalOptions.length > 0;
    const hasTypes    = this.typesCorrelations.length > 0;
    if (!hasCorporal || !hasTypes) return;

    // 1) Dato corporal por defecto
    this.selectedDatoCorporal = this.datosCorporalOptions[0].value;
    this.applyHabitosForSelectedCorporal(); // llena filteredDatosHabitos y setea selectedDatoHabito

    // 2) Tipo de correlación por defecto (primer item)
    this.selectedStatus = this.typesCorrelations[1];

    this.firstAutoDone = true;

    // 3) Dispara análisis inicial
    this.realizarAnalisis();
  }

  /** Cuando cambia Dato Corporal, actualiza la lista de hábitos y fija el primero */
  onDatoCorporalChange() {
    this.applyHabitosForSelectedCorporal();
    this.clearResults(); // limpia resultados al cambiar parámetros
  }

  private applyHabitosForSelectedCorporal() {
    const corr = Correlaciones.find(c => c.indicador.value === this.selectedDatoCorporal);
    this.filteredDatosHabitos = corr ? corr.habitos : [];
    this.selectedDatoHabito = this.filteredDatosHabitos[0]?.value ?? '';
  }

  onDatoHabitoChange() { this.clearResults(); }
  onTipoChange()       { this.clearResults(); }

  /** Limpia UI de resultados para no dejar datos “viejos” */
  private clearResults() {
    this.correlationData = null;
    this.analisisIntentado = false;
  }

  /** Hace la petición y maneja correctamente “sin datos” */
  realizarAnalisis(): void {
    if (!this.selectedDatoCorporal || !this.selectedDatoHabito || !this.selectedStatus) {
      this.messageService.add({ severity:'warn', summary:'Faltan datos', detail:'Seleccione todas las variables.' });
      return;
    }

    // Limpia resultados previos para evitar confusión visual
    this.correlationData = null;
    this.analisisIntentado = true;
    this.loading = true;

    const variableX = this.selectedDatoCorporal;
    const variableY = this.selectedDatoHabito;

    this.correlationService
      .getCorrelationHealthyVsHabits(variableX, variableY, this.selectedStatus)
      .subscribe({
        next: (data) => {
          this.loading = false;

          // Si la API responde vacío, null o con {error}, no dejes datos anteriores
          if (!data || (data as any).error) {
            this.correlationData = null;
            this.messageService.add({
              severity: 'warn',
              summary: 'Sin datos suficientes',
              detail: (data as any)?.error ?? 'No hay datos para esta combinación.'
            });
            return;
          }

          this.correlationData = data;
          this.messageService.add({
            severity: 'success',
            summary: 'Análisis completado',
            detail: 'Los resultados se han generado correctamente.'
          });
        },
        error: () => {
          this.loading = false;
          this.correlationData = null; // 🔑 evita que queden resultados viejos
          this.messageService.add({
            severity: 'warn',
            summary: 'Sin datos suficientes',
            detail: 'No hay datos para esta combinación.'
          });
        }
      });
  }
}
