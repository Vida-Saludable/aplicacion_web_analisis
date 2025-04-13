import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjecUabComponent } from './project-aub.component';




@NgModule({
	imports: [RouterModule.forChild([
		{
            path: '',
            component: ProjecUabComponent
         },

         {
            path: 'Projects',
            component: ProjecUabComponent
         }
	])],
	exports: [RouterModule]
})
export class ProjectRoutingModule { }
