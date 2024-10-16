import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AguaComponent } from './agua/agua.component';
import { AireComponent } from './aire/aire.component';
import { AlimentosComponent } from './alimentos/alimentos.component';
import { DespertarComponent } from './despertar/despertar.component';
import { DormirComponent } from './dormir/dormir.component';
import { EjercicioComponent } from './ejercicio/ejercicio.component';
import { EsperanzaComponent } from './esperanza/esperanza.component';
import { SolComponent } from './sol/sol.component';
import { SuenioComponent } from './suenio/suenio.component';



@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AguaComponent},
      { path: 'agua', component: AguaComponent},
      { path: 'aire', component: AireComponent},
      { path: 'alimentos', component: AlimentosComponent},
      { path: 'despertar', component: DespertarComponent},
      { path: 'dormir', component: DormirComponent},
      { path: 'ejercicio', component: EjercicioComponent},
      { path: 'esperanza', component: EsperanzaComponent},
      { path: 'sol', component: SolComponent},
      { path: 'suenio', component: SuenioComponent},
   
	])],
	exports: [RouterModule]
})
export class HabitsRoutingModule { }
