import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RippleModule } from 'primeng/ripple';
import { ChartModule } from 'primeng/chart';
import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './pacientes/patients.component';
import { InitialVsEndIndicatorsComponent } from './initial-vs-end-indicators/initial-vs-end-indicators.component';
import { PatientsHistoryComponent } from '../EstadisticasPacientes/patients-history/patients-history.component';
import { HistorialDeUsuariosComponent } from '../EstadisticasPacientes/historial-de-usuarios/historial-de-usuarios.component';



@NgModule({
  declarations: [
	PatientsComponent,
	InitialVsEndIndicatorsComponent,
	PatientsHistoryComponent,
	HistorialDeUsuariosComponent

],
  imports: [
    CommonModule,
    PatientsRoutingModule,
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
		ChartModule
  ]

 

})
export class PatientsModule { }
