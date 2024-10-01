import { Component, inject, OnInit } from '@angular/core';
import { datosCorporales, datosHabitos } from 'src/app/helpers/data-habits-healthy';
import { CorrelationHealthyHabits } from 'src/app/models/correlationshealthyhabits.model';
import { CorrelationHealthHabitsService } from 'src/app/services/correlation-health-habits.service';
import { TypeCorrelationService } from 'src/app/services/type-correlation.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-grupo-fisica-grupo-habito',
  templateUrl: './variable-fisica-variable-habito.component.html',
  styleUrls: ['./variable-fisica-variable-habito.component.scss'],
  providers: [MessageService] // Añadir MessageService para las notificaciones
})
export class VariableFisicaVariableHabitoComponent implements OnInit  {
  selectedDatoCorporal: string;
  selectedDatoHabito: string;
  selectedStatus: string = ''; // Modificado para manejar el valor seleccionado de los tipos de correlación
  correlationData: CorrelationHealthyHabits;
  typesCorrelations: string[] = []; // Almacenar la lista de tipos de correlación
  loading: boolean = false;
  
  private correlation$ = inject(TypeCorrelationService);
  private messageService = inject(MessageService);

  datosCorporales = datosCorporales;
  datosHabitos = datosHabitos;

  constructor(private correlationService: CorrelationHealthHabitsService) {}

  ngOnInit(): void {
    this.getTypeCorrelation(); // Cargar los tipos de correlación al inicializar el componente
  }

  // Obtener los tipos de correlación desde el servicio y asignarlos a typesCorrelations
  getTypeCorrelation() { 
    this.correlation$.getTypesCorrelations().subscribe(response => {
      this.typesCorrelations = response;
    }, error => {
      console.error('Error al obtener tipos de correlación', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los tipos de correlación.' });
    });
  }

  // Realizar el análisis de correlación cuando se seleccionan todas las variables
  realizarAnalisis(): void {
    if (this.selectedDatoCorporal && this.selectedDatoHabito && this.selectedStatus) {
      this.loading = true;
      const variableX = this.selectedDatoCorporal;
      const variableY = this.selectedDatoHabito;

      // Llamada al servicio para obtener el análisis de correlación
      this.correlationService.getCorrelationHealthyVsHabits(variableX, variableY, this.selectedStatus)
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
      this.messageService.add({ severity: 'warn', summary: 'Faltan datos', detail: 'Seleccione todas las variables antes de realizar el análisis.' });
    }
  }
}
