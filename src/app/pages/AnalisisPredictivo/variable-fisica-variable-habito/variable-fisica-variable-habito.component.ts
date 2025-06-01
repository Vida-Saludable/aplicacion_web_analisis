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
  selectedDatoCorporal: string;
  selectedDatoHabito: string;
  selectedStatus: string = '';
  correlationData: CorrelationHealthyHabits;
  typesCorrelations: string[] = [];
  loading: boolean = false;
  analisisIntentado: boolean = false;


  filteredDatosHabitos: any[] = []; // Habitos filtrados dinámicamente
  datosCorporalOptions: any[] = []; // Opciones para el dropdown de Dato Corporal

  private correlation$ = inject(TypeCorrelationService);
  private messageService = inject(MessageService);

  correlaciones = Correlaciones; // Utilizar la lista de correlaciones

  constructor(private correlationService: CorrelationHealthHabitsService) {}

  ngOnInit(): void {
    this.getTypeCorrelation();
    this.setDatosCorporalOptions();
  }

  // Generar opciones para el dropdown de Dato Corporal
  setDatosCorporalOptions() {
    this.datosCorporalOptions = this.correlaciones.map(c => c.indicador);
  }

  getTypeCorrelation() {
    this.correlation$.getTypesCorrelations().subscribe(
      response => {
        this.typesCorrelations = response;
      },
      error => {
        console.error('Error al obtener tipos de correlación', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los tipos de correlación.' });
      }
    );
  }

  // Método para actualizar los hábitos según el dato corporal seleccionado
  onDatoCorporalChange() {
    const correlacion = this.correlaciones.find(c => c.indicador.value === this.selectedDatoCorporal);
    this.filteredDatosHabitos = correlacion ? correlacion.habitos : [];
  }

realizarAnalisis(): void {
  if (this.selectedDatoCorporal && this.selectedDatoHabito && this.selectedStatus) {
    this.analisisIntentado = true;
    this.loading = true;

    const variableX = this.selectedDatoCorporal;
    const variableY = this.selectedDatoHabito;

    this.correlationService.getCorrelationHealthyVsHabits(variableX, variableY, this.selectedStatus)
      .subscribe(
        data => {
          this.loading = false;

          if (data.error) {
            this.correlationData = null;
            this.messageService.add({
              severity: 'warn',
              summary: 'Sin datos suficientes',
              detail: data.error
            });
            return;
          }

          this.correlationData = data;
          this.messageService.add({
            severity: 'success',
            summary: 'Análisis Completado',
            detail: 'Los resultados se han generado correctamente.'
          });
        },
        error => {
          this.loading = false;
          this.analisisIntentado = true;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Sin datos suficientes.'
          });
        }
      );
  } else {
    this.messageService.add({
      severity: 'warn',
      summary: 'Faltan datos',
      detail: 'Seleccione todas las variables antes de realizar el análisis.'
    });
  }
}


}
