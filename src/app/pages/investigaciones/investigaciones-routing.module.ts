import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvestigacionesComponent } from './investigaciones/investigaciones.component';



@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: InvestigacionesComponent }
	])],
	exports: [RouterModule]
})
export class InvestigacionesRoutingModule { }
