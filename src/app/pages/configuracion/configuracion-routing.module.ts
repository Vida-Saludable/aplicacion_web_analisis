import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfiguracionComponent } from './configuracion/configuracion.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ConfiguracionComponent }
	])],
	exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
