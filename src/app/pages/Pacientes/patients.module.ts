import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDemoRoutingModule } from 'src/app/demo/components/uikit/table/tabledemo-routing.module';
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
import { ChartsDemoRoutingModule } from 'src/app/demo/components/uikit/charts/chartsdemo-routing.module';
import { ChartModule } from 'primeng/chart';
import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './pacientes/patients.component';
import { InitialVsEndIndicatorsComponent } from './initial-vs-end-indicators/initial-vs-end-indicators.component';



@NgModule({
  declarations: [
	PatientsComponent,
	InitialVsEndIndicatorsComponent

],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    TableDemoRoutingModule,
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
    ChartsDemoRoutingModule,
		ChartModule
  ]

 

})
export class PatientsModule { }
