import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReglasDinamicaRoutingModule } from './reglas-dinamicas-routing.module';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ReglasDinamicaComponent } from './reglas-dinamicas/reglas-dinamica.component';



@NgModule({
  declarations: [ReglasDinamicaComponent],
  imports: [
    CommonModule,
    ReglasDinamicaRoutingModule,
    CardModule,
    AccordionModule,
    TabViewModule,
    ButtonModule,
    PanelModule
  ]
})
export class ReglasDinamicaModule { }
