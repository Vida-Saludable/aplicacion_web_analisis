import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReglasDinamicaComponent } from './reglas-dinamicas/reglas-dinamica.component';



@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ReglasDinamicaComponent }
	])],
	exports: [RouterModule]
})
export class ReglasDinamicaRoutingModule { }
