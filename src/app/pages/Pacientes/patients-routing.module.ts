import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InitialVsEndIndicatorsComponent } from './initial-vs-end-indicators/initial-vs-end-indicators.component';
import { PatientsComponent } from './pacientes/patients.component';
import { PatientsHistoryComponent } from '../EstadisticasPacientes/patients-history/patients-history.component';
import { HistorialDeUsuariosComponent } from '../EstadisticasPacientes/historial-de-usuarios/historial-de-usuarios.component';




@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PatientsComponent },
		{ path: 'indicadoresInicialesVsFinales', component: PatientsComponent },
		{ path: 'indicadoresInicialesVsFinales/:id', component: InitialVsEndIndicatorsComponent },

	])],
	exports: [RouterModule]
})
export class PatientsRoutingModule { }
