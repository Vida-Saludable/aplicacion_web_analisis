import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasPacientesRoutingModule } from './estadisticas-pacientes-routing.module';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { IndicadoresSaludProyectoComponent } from './indicador-salud-proyecto/indicadores-salud-proyecto.component';
import { IndicadorSaludUsuarioComponent } from './indicador-salud-usuario/indicador-salud-usuario.component';
import { TendenciasPatronesRiesgoComponent } from './tendencias-patrones-riesgo/tendencias-patrones-riesgo.component';
import { EstadisticaProyectoComponent } from './estadistica-proyecto/estadistica-proyecto.component';
import { EstadisticaUsuarioComponent } from './estadistica-usuario/estadistica-usuario.component';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { TendenciasHabitosUsuarioComponent } from './tendencias-habitos-usuario/tendencias-habitos-usuario.component';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@NgModule({
  declarations: [
	IndicadoresSaludProyectoComponent,
	IndicadorSaludUsuarioComponent,
	TendenciasPatronesRiesgoComponent,
	EstadisticaProyectoComponent,
	EstadisticaUsuarioComponent,
	TendenciasHabitosUsuarioComponent,
	
  ],
  imports: [
	ChartModule,
    CommonModule,
    EstadisticasPacientesRoutingModule,
	CalendarModule,
		FormsModule,
		TableModule,
		RatingModule,
		ButtonModule,
		SliderModule,
		InputTextModule,
		ToggleButtonModule,
		RippleModule,
		MultiSelectModule,
		DropdownModule,
		ProgressBarModule,
		ToastModule,
		CardModule,
		MessagesModule,
		ProgressSpinnerModule
		
		
  ]
})
export class EstadisticasPacientesModule { }
