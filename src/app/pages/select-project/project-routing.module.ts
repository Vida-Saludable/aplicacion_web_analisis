import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectComponent } from './Project.component';



@NgModule({
	imports: [RouterModule.forChild([
		{
            path: '',
            component: ProjectComponent
         },

         {
            path: 'Projects',
            component: ProjectComponent
         }
	])],
	exports: [RouterModule]
})
export class ProjectRoutingModule { }
