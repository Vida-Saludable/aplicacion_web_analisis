import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    userRole!: string | null;
    

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService

    ) { }

    ngOnInit() {
        this.userRole = this.authService.getUserRole();
        this.model = [

            {
                label: 'Inicio',
                items: [
                    { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard/'] }
                ]
            },
            {
                label: 'Estadísticas',
                items: [
                    {
                        label: 'Estadísticas',
                        icon: 'pi pi-fw pi-chart-bar',
                        items: [
                            {
                                label: 'Indicadores de Salud del proyecto',
                                icon: 'pi pi-fw pi-heart-fill',
                                routerLink: ['/dashboard/Estadisticas/indicadoresSaludProyecto']
                            },
                            {
                                label: 'Indicador de Salud por Usuario',
                                icon: 'pi pi-fw pi-user-edit',
                                routerLink: ['/dashboard/Estadisticas/indicadoresSaludUsuario']
                            },
                            {
                                label: 'Tendencias de de habitos',
                                icon: 'pi pi-fw pi-chart-line',
                                routerLink: ['/dashboard/Estadisticas/tendenciasPatrones']
                            },
                            { 
                                label: 'Historial de Habitos', 
                                icon: 'pi pi-fw pi-id-card', 
                                routerLink: ['/dashboard/Estadisticas/historialHábitos'] },
                       
                        ]
                    },
                ]
            },

            {
                label: 'Correlación',
                items: [
                    {
                        label: 'Correlación',
                        icon: 'pi pi-fw pi-chart-line',
                        items: [
                            {
                                label: 'Variable Física contra Variable Hábito',
                                icon: 'pi pi-fw pi-clone',
                                routerLink: ['/dashboard/Analisis/VariableFisicaVariableHabito']
                            },
                            {
                                label: 'Variable Física contra Variable Hábito Deltas',
                                icon: 'pi pi-fw pi-align-left',
                                routerLink: ['/dashboard/Analisis/VariableFisicaVariableHabitoDeltas']
                            },
                           
                        ]
                    },
                ]
            },
            {
                label: 'Hábitos de usuarios',
                items: [
                    {
                        label: 'Hábitos de usuarios',
                        icon: 'pi pi-fw pi-chart-bar',
                        items: [
                            { label: 'Agua', icon: 'pi pi-fw pi-slack', routerLink: ['/dashboard/habitos/agua'] },
                            { label: 'Aire', icon: 'pi pi-fw pi-cloud', routerLink: ['/dashboard/habitos/aire'] },
                            { label: 'Alimentos', icon: 'pi pi-fw pi-circle-on', routerLink: ['/dashboard/habitos/alimentos'] },
                            { label: 'Despertar', icon: 'pi pi-fw pi-compass', routerLink: ['/dashboard/habitos/despertar'] },
                            { label: 'Dormir', icon: 'pi pi-fw pi-clock', routerLink: ['/dashboard/habitos/dormir'] },
                            { label: 'Ejercicio', icon: 'pi pi-fw pi-compass', routerLink: ['/dashboard/habitos/ejercicio'] },
                            { label: 'Esperanza', icon: 'pi pi-fw pi-file', routerLink: ['/dashboard/habitos/esperanza'] },
                            { label: 'Sol', icon: 'pi pi-fw pi-sun', routerLink: ['/dashboard/habitos/sol'] },
                       
                        ]
                    },
                ]
               
            },
            {
                label: 'Seguimiento Pacientes',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    { label: 'Indicadores Indiciales vs Finales', icon: 'pi pi-fw pi-user-plus', routerLink: ['/dashboard/seguimientoPacientes/indicadoresInicialesVsFinales'] },
                    
       
                ]
            },
          
            {
                label: 'Reglas y Operativa',
                items: [
                    { label: 'Reglas y Dinamica operativa', icon: 'pi pi-fw pi-sitemap', routerLink: ['/dashboard/Reglas'] }
                ]
            },
        
         
         
          //  {
          //      label: 'Control del sistema',
          //      items: [
          //          { label: 'Control de Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/dashboard/controlUsuarios/usuarios'] },
          //          { label: 'Control de Projectos', icon: 'pi pi-fw pi-box', routerLink: ['/dashboard/controlUsuarios/projectos'] }
          //      ]
          //  },

           
       
        ];

         // Solo agregar el ítem "Control del sistema" si el rol es Admin
    if (this.userRole === 'Admin') {
        this.model.push({
            label: 'Control del sistema',
            items: [
                { label: 'Control de Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/dashboard/controlUsuarios/usuarios'] },
                { label: 'Control de Proyectos', icon: 'pi pi-fw pi-box', routerLink: ['/dashboard/controlUsuarios/projectos'] }
            ]
        });
    }
    }
}

