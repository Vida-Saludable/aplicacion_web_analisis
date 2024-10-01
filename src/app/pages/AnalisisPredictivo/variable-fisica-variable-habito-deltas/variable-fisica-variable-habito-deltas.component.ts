import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { datosCorporales, datosHabitos } from 'src/app/helpers/data-habits-healthy';
import { CorrelationHealthyHabistDeltas } from 'src/app/models/correlationshealthyhabitsdeltas.mode';

import { CorrelationHealthHabitsService } from 'src/app/services/correlation-health-habits.service';
import { TypeCorrelationService } from 'src/app/services/type-correlation.service';

@Component({
  selector: 'app-variable-fisica-variable-habito',
  templateUrl: './variable-fisica-variable-habito-deltas.component.html',
  styleUrls: ['./variable-fisica-variable-habito-deltas.component.scss']
})
export class VariableFisicaVariableHabitoDeltasComponent {
  selectedDatoCorporal: string;
  selectedDatoHabito: string;
  selectedStatusX: string = ''; 
  selectedStatusY: string = ''; 
  correlationData: CorrelationHealthyHabistDeltas;
  typesCorrelations: string[] = []; 
  loading: boolean = false;

  private correlation$ = inject(TypeCorrelationService);
  private messageService = inject(MessageService);

  datosCorporales = datosCorporales;
  datosHabitos = datosHabitos;

  constructor(private correlationService: CorrelationHealthHabitsService) {}

  ngOnInit(): void {
    this.getTypeCorrelation(); 
  }

  getTypeCorrelation() { 
    this.correlation$.getTypesCorrelations().subscribe(response => {
      this.typesCorrelations = response;
    }, error => {
      console.error('Error al obtener tipos de correlación', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los tipos de correlación.' });
    });
  }

  realizarAnalisis(): void {
    if (this.selectedDatoCorporal && this.selectedDatoHabito && this.selectedStatusX && this.selectedStatusY) {
      this.loading = true;
      const variableX = this.selectedDatoCorporal;
      const variableY = this.selectedDatoHabito;

      this.correlationService.getCorrelationHealthyVsHabitsDeltas(variableX, variableY, this.selectedStatusX, this.selectedStatusY)
        .subscribe(data => {
          this.correlationData = data;
          this.messageService.add({ severity: 'success', summary: 'Análisis Completado', detail: 'Los resultados se han generado correctamente.' });
          this.loading = false;
        }, error => {
          console.error('Error al realizar el análisis', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo completar el análisis.' });
          this.loading = false;
        });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Faltan Datos', detail: 'Debe seleccionar todas las opciones para realizar el análisis.' });
    }
  }

  interpretarCorrelacion(correlacion: number, pValue: number): string {
    let interpretacion = '';
  
    // Interpretación del valor de correlación
    if (correlacion > 0.7) {
      interpretacion = 'Existe una fuerte correlación positiva.';
    } else if (correlacion > 0.4) {
      interpretacion = 'Existe una correlación positiva moderada.';
    } else if (correlacion > 0) {
      interpretacion = 'Existe una correlación positiva débil.';
    } else if (correlacion < -0.7) {
      interpretacion = 'Existe una fuerte correlación negativa.';
    } else if (correlacion < -0.4) {
      interpretacion = 'Existe una correlación negativa moderada.';
    } else if (correlacion < 0) {
      interpretacion = 'Existe una correlación negativa débil.';
    } else {
      interpretacion = 'No hay correlación significativa.';
    }
  
    // Interpretación del p-valor
    if (pValue < 0.05) {
      interpretacion += ' La correlación es estadísticamente significativa.';
    } else {
      interpretacion += ' La correlación no es estadísticamente significativa.';
    }
  
    return interpretacion;
  }
  
}
