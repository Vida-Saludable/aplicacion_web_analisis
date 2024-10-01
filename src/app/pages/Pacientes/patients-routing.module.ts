import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InitialVsEndIndicatorsComponent } from './initial-vs-end-indicators/initial-vs-end-indicators.component';
import { PatientsComponent } from './pacientes/patients.component';




@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PatientsComponent },
		// { path: 'usuarios/:id', component: HistorialDeUsuariosComponent }
		{ path: 'initialvsfinalindicators/:id', component: InitialVsEndIndicatorsComponent }
	])],
	exports: [RouterModule]
})
export class PatientsRoutingModule { }
