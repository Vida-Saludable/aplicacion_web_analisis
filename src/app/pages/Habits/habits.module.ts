import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitsRoutingModule } from './habits-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { AguaComponent } from './agua/agua.component';
import { AireComponent } from './aire/aire.component';
import { AlimentosComponent } from './alimentos/alimentos.component';
import { DespertarComponent } from './despertar/despertar.component';
import { DormirComponent } from './dormir/dormir.component';
import { EjercicioComponent } from './ejercicio/ejercicio.component';
import { EsperanzaComponent } from './esperanza/esperanza.component';
import { SolComponent } from './sol/sol.component';
import { SuenioComponent } from './suenio/suenio.component';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';



@NgModule({
  declarations: [
	AguaComponent,
	AireComponent,
	AlimentosComponent,
	DespertarComponent,
	DormirComponent,
	EjercicioComponent,
	EsperanzaComponent,
	SolComponent,
	SuenioComponent
  ],
  imports: [
	ChartModule,
    CommonModule,
    HabitsRoutingModule,
	CalendarModule,
	ReactiveFormsModule,
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
		MessagesModule
		
		
  ],
  providers: [MessageService]
})
export class HabitsModule { }
