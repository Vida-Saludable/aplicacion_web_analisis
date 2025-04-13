import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

import { PaginatorModule } from 'primeng/paginator';
import { CardProjectComponent } from '../../components/shared/card-project/card-project.component';
import { CardModule } from 'primeng/card';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjecUabComponent } from './Project-aub.component';



@NgModule({
  declarations: [
    ProjecUabComponent,
    CardProjectComponent

  ],
  imports: [
    CommonModule,
    DataViewModule,
    PaginatorModule,
		PickListModule,
		OrderListModule,
		InputTextModule,
		DropdownModule,
		RatingModule,
    DataViewModule,
		ButtonModule,
    CardModule,
    InputSwitchModule,
    ProjectRoutingModule
    
  ],
  exports: [
    ProjecUabComponent
  ]
})
export class ProjectModule { }
