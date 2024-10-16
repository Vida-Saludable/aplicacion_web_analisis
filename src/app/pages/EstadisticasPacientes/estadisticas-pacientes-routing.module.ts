import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IndicadoresSaludProyectoComponent } from './indicador-salud-proyecto/indicadores-salud-proyecto.component';
import { IndicadorSaludUsuarioComponent } from './indicador-salud-usuario/indicador-salud-usuario.component';
import { TendenciasPatronesRiesgoComponent } from './tendencias-patrones-riesgo/tendencias-patrones-riesgo.component';
import { EstadisticaProyectoComponent } from './estadistica-proyecto/estadistica-proyecto.component';
import { EstadisticaUsuarioComponent } from './estadistica-usuario/estadistica-usuario.component';
import { TendenciasHabitosUsuarioComponent } from './tendencias-habitos-usuario/tendencias-habitos-usuario.component';
import { PatientsHistoryComponent } from './patients-history/patients-history.component';
import { HistorialDeUsuariosComponent } from './historial-de-usuarios/historial-de-usuarios.component';


@NgModule({
	imports: [RouterModule.forChild([
		{ 
            path: '',
            component: IndicadoresSaludProyectoComponent
         },

         { 
            // path: 'indicadoresSalud',
            path: 'indicadoresSaludProyecto',
            component: EstadisticaProyectoComponent
         },
         { 
            path: 'indicadoresSaludUsuario',
            // path: 'resumenPaciente',
            component: IndicadorSaludUsuarioComponent
         },
         { 
            // path: 'tendenciasPatrones',
            path: 'tendenciasPatrones',
            component: TendenciasPatronesRiesgoComponent
         },

         { 
            path: 'usuario/:id',
            component: EstadisticaUsuarioComponent
         },
         { 
            path: 'tendenciaUsuario/:id',
            component: TendenciasHabitosUsuarioComponent
         },
         { path: 'historialHábitos', component: PatientsHistoryComponent },
         { path: 'historialHábitos/:id', component: HistorialDeUsuariosComponent },

	])],
	exports: [RouterModule]
})
export class EstadisticasPacientesRoutingModule { }
