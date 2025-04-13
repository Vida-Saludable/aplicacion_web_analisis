import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './core/auth.guard';
import { PagesNotFoundComponent } from './helpers/components/pages-not-found/pages-not-found.component';
import { UnauthorizedPageComponent } from './helpers/components/unauthorized-page/unauthorized-page.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', redirectTo: '/auth', pathMatch: 'full'  // Redirecciona a 'auth/login'
            },
            { path: 'select-project',
                canActivate: [AuthGuard],
                data: { roles: ['Admin', 'SupProy', 'RespSeg', 'TomDatos', 'Paciente'] },
                loadChildren: () => import('./pages/select-project/project.module').then(m => m.ProjectModule) },
            {
                path: 'dashboard', component: AppLayoutComponent, canActivate: [AuthGuard],
                data: { roles: ['Admin', 'SupProy', 'RespSeg', 'TomDatos', 'Paciente'] },
                children: [
                    {
                        canActivate: [AuthGuard],
                        data: { roles: ['Admin', 'SupProy', 'RespSeg', 'TomDatos', 'Paciente'] },
                         path: 'Analisis', loadChildren: () => import('./pages/AnalisisPredictivo/analisis-predictivo.module').then(m => m.AnalisisPredictivoModule) },
                    { 
                        canActivate: [AuthGuard],
                        data: { roles: ['Admin', 'SupProy', 'RespSeg', 'TomDatos', 'Paciente'] },
                        path: 'Configuracion', loadChildren: () => import('./pages/configuracion/configuracion..module').then(m => m.ConfiguracionModule) },
                    { 
                        canActivate: [AuthGuard],
                        data: { roles: ['Admin', 'SupProy', 'RespSeg', 'TomDatos', 'Paciente'] },
                        path: 'controlUsuarios', loadChildren: () => import('./pages/control-usuarios/control-usuarios.module').then(m => m.ControlUsuariosModule) },
                    { 
                        canActivate: [AuthGuard],
                        data: { roles: ['Admin', 'SupProy', 'RespSeg', 'TomDatos', 'Paciente'] },
                        path: 'Estadisticas', loadChildren: () => import('./pages/EstadisticasPacientes/estadisticas-pacientes.module').then(m => m.EstadisticasPacientesModule) },
                    { 
                        canActivate: [AuthGuard],
                        data: { roles: ['Admin', 'SupProy', 'RespSeg', 'TomDatos', 'Paciente'] },
                        path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
                    { 
                        canActivate: [AuthGuard],
                        data: { roles: ['Admin', 'SupProy', 'RespSeg', 'TomDatos', 'Paciente'] },
                        path: 'Investigaciones', loadChildren: () => import('./pages/investigaciones/investigaciones.module').then(m => m.InvestigacionesComponentModule) },
                    { 
                        canActivate: [AuthGuard],
                        data: { roles: ['Admin', 'SupProy', 'RespSeg', 'TomDatos', 'Paciente'] },
                        path: 'Reglas', loadChildren: () => import('./pages/reglas-dinamica/reglas-dinamica.module').then(m => m.ReglasDinamicaModule) },
                    { 
                        canActivate: [AuthGuard],
                        data: { roles: ['Admin', 'SupProy', 'RespSeg', 'TomDatos', 'Paciente'] },
                        path: 'seguimientoPacientes', loadChildren: () => import('./pages/Pacientes/patients.module').then(m => m.PatientsModule) },

                    { 
                        canActivate: [AuthGuard],
                        data: { roles: ['Admin', 'SupProy', 'RespSeg', 'TomDatos', 'Paciente'] },
                        path: 'habitos', loadChildren: () => import('./pages/Habits/habits.module').then(m => m.HabitsModule) },
                ]
            },
            { path: 'auth', loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: PagesNotFoundComponent },
            { path: 'unauthorizedPageComponent', component: UnauthorizedPageComponent },

            { path: '**', redirectTo: '/notfound' }  // Redireccionar a una página 404 para rutas no existentes
        ], 
        { 
            scrollPositionRestoration: 'enabled', 
            anchorScrolling: 'enabled', 
            onSameUrlNavigation: 'reload' 
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
