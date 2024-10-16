import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ChartModule } from 'primeng/chart';
import { HomeComponent } from './home/home.component';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ChartModule,
    CardModule,
    
    ProgressBarModule
  ]
})
export class HomeModule { }
