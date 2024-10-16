import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ControlUsuariosComponent } from './control-usuarios/control-usuarios.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';

import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { ControlProjectsComponent } from './control-projects/control-projects.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ControlUsuariosComponent },
		{ path: 'usuarios', component: ControlUsuariosComponent },
		{ path: 'usuarios/new', component: AddEditUserComponent }, // Ruta para crear nuevo usuario
		{ path: 'usuarios/:id', component: AddEditUserComponent },
		{ path: 'projectos', component: ControlProjectsComponent },
		{ path: 'projectos/new', component: AddEditProjectComponent },
		{ path: 'projectos/:id', component: AddEditProjectComponent },
	])],
	exports: [RouterModule]
})
export class ControlUsuariosRoutingModule { }
