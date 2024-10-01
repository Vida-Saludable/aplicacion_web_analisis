import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ControlUsuariosComponent } from './control-usuarios/control-usuarios.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ControlUsuariosComponent }
	])],
	exports: [RouterModule]
})
export class ControlUsuariosRoutingModule { }
