import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CorrelationHealthyHabistDeltas } from 'src/app/models/correlationshealthyhabitsdeltas.mode';
import { CorrelationHealthHabitsService } from 'src/app/services/correlation-health-habits.service';
import { TypeCorrelationService } from 'src/app/services/type-correlation.service';
import { Correlaciones } from 'src/app/helpers/objectsCorrelations.ts/data-habits-healthy-clasificate';

@Component({
  selector: 'app-variable-fisica-variable-habito',
  templateUrl: './variable-fisica-variable-habito-deltas.component.html',
  styleUrls: ['./variable-fisica-variable-habito-deltas.component.scss'],
  providers: [MessageService]
})
export class VariableFisicaVariableHabitoDeltasComponent implements OnInit {
  public messages: any[] = [];
  selectedDatoCorporal: string;
  selectedDatoHabito: string;
  selectedStatusX: string = '';
  selectedStatusY: string = '';
  correlationData: CorrelationHealthyHabistDeltas;
  typesCorrelations: string[] = [];
  loading: boolean = false;
  analisisIntentado: boolean = false;


  filteredDatosHabitos: any[] = []; // Hábitos filtrados dinámicamente
  datosCorporalOptions: any[] = []; // Opciones para Dato Corporal

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

  // Validación para asegurarse de que los tipos de correlación sean válidos
  validarTiposCorrelacion(): boolean {
    if (this.selectedStatusX === this.selectedStatusY) {
      this.messages.push({ severity: 'warn', summary: 'Selección inválida', detail: 'No puede seleccionar el mismo tipo de correlación para X e Y.' });
      this.messageService.add(this.messages[this.messages.length - 1]);
      return false;
    }
    if ((this.selectedStatusX === 'final' && this.selectedStatusY === 'inicial') ) {
      this.messages.push({ severity: 'warn', summary: 'Selección inválida', detail: 'El tipo de correlación inicial no puede ser comparado con el tipo final.' });
      this.messageService.add(this.messages[this.messages.length - 1]);
      return false;
    }
    return true;
  }

 realizarAnalisis(): void {
  if (this.selectedDatoCorporal && this.selectedDatoHabito && this.selectedStatusX && this.selectedStatusY) {
    if (!this.validarTiposCorrelacion()) {
      return;
    }

    this.analisisIntentado = true;
    this.loading = true;

    const variableX = this.selectedDatoCorporal;
    const variableY = this.selectedDatoHabito;

    this.correlationService.getCorrelationHealthyVsHabitsDeltas(variableX, variableY, this.selectedStatusX, this.selectedStatusY)
      .subscribe(
        data => {
          this.correlationData = data;
          this.messageService.add({ severity: 'success', summary: 'Análisis Completado', detail: 'Los resultados se han generado correctamente.' });
          this.loading = false;
        },
        error => {
          console.error('Error al realizar el análisis', error);
          this.correlationData = null;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error?.error || 'No se pudo completar el análisis.' });
          this.loading = false;
        }
      );
  } else {
    this.messageService.add({ severity: 'warn', summary: 'Faltan Datos', detail: 'Debe seleccionar todas las opciones para realizar el análisis.' });
  }
}

}
