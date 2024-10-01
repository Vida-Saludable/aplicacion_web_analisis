import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './core/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', redirectTo: '/auth', pathMatch: 'full'  // Redirecciona a 'auth/login'
            },
            { path: 'select-project',
                canActivate: [AuthGuard],
                loadChildren: () => import('./pages/select-project/project.module').then(m => m.ProjectModule) },
            {
                path: 'dashboard', component: AppLayoutComponent, canActivate: [AuthGuard],
                children: [
                    { path: 'Analisis', loadChildren: () => import('./pages/AnalisisPredictivo/analisis-predictivo.module').then(m => m.AnalisisPredictivoModule) },
                    { path: 'Configuracion', loadChildren: () => import('./pages/configuracion/configuracion..module').then(m => m.ConfiguracionModule) },
                    { path: 'ControlUsuarios', loadChildren: () => import('./pages/control-usuarios/control-usuarios.module').then(m => m.ControlUsuariosModule) },
                    { path: 'Estadisticas', loadChildren: () => import('./pages/EstadisticasPacientes/estadisticas-pacientes.module').then(m => m.EstadisticasPacientesModule) },
                    { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
                    { path: 'Investigaciones', loadChildren: () => import('./pages/investigaciones/investigaciones.module').then(m => m.InvestigacionesComponentModule) },
                    { path: 'Reglas', loadChildren: () => import('./pages/reglas-dinamica/reglas-dinamica.module').then(m => m.ReglasDinamicaModule) },
                    { path: 'SeguimientoPacientes', loadChildren: () => import('./pages/Pacientes/patients.module').then(m => m.PatientsModule) },
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
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
