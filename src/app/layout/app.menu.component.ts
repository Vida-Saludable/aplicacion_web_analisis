import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
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
        
         
         
            {
                label: 'Control del sistema',
                items: [
                    { label: 'Control de Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/dashboard/controlUsuarios/usuarios'] },
                    { label: 'Control de Projectos', icon: 'pi pi-fw pi-box', routerLink: ['/dashboard/controlUsuarios/projectos'] }
                ]
            },

           
            
            // {
            //     label: 'Hidratación',
            //     items: [
            //         { label: 'Configuracion', icon: 'pi pi-fw pi-cog', routerLink: ['/dashboard/Configuracion'] }
            //     ]
            // },
        
          


            
          
            // {
            //     label: 'UI Components',
            //     items: [
            //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/dashboard/uikit/formlayout'] },
            //         { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/dashboard/uikit/input'] },
            //         { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/dashboard/uikit/floatlabel'] },
            //         { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/dashboard/uikit/invalidstate'] },
            //         { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/dashboard/uikit/button'] },
            //         { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/dashboard/uikit/table'] },
            //         { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/dashboard/uikit/list'] },
            //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/dashboard/uikit/tree'] },
            //         { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/dashboard/uikit/panel'] },
            //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/dashboard/uikit/overlay'] },
            //         { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/dashboard/uikit/media'] },
            //         { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/dashboard/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
            //         { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/dashboard/uikit/message'] },
            //         { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/dashboard/uikit/file'] },
            //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/dashboard/uikit/charts'] },
            //         { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/dashboard/uikit/misc'] }
            //     ]
            // },
            // {
            //     label: 'Prime Blocks',
            //     items: [
            //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/dashboard/blocks'], badge: 'NEW' },
            //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
            //     ]
            // },
            // {
            //     label: 'Utilities',
            //     items: [
            //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/dashboard/utilities/icons'] },
            //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
            //     ]
            // },
            // {
            //     label: 'Pages',
            //     icon: 'pi pi-fw pi-briefcase',
            //     items: [
            //         {
            //             label: 'Landing',
            //             icon: 'pi pi-fw pi-globe',
            //             routerLink: ['/dashboard/landing']
            //         },
            //         {
            //             label: 'Auth',
            //             icon: 'pi pi-fw pi-user',
            //             items: [
            //                 {
            //                     label: 'Login',
            //                     icon: 'pi pi-fw pi-sign-in',
            //                     routerLink: ['/dashboard/auth/login']
            //                 },
            //                 {
            //                     label: 'Error',
            //                     icon: 'pi pi-fw pi-times-circle',
            //                     routerLink: ['/dashboard/auth/error']
            //                 },
            //                 {
            //                     label: 'Access Denied',
            //                     icon: 'pi pi-fw pi-lock',
            //                     routerLink: ['/dashboard/auth/access']
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Crud',
            //             icon: 'pi pi-fw pi-pencil',
            //             routerLink: ['/dashboard/pages/crud']
            //         },
            //         {
            //             label: 'Timeline',
            //             icon: 'pi pi-fw pi-calendar',
            //             routerLink: ['/dashboard/pages/timeline']
            //         },
            //         {
            //             label: 'Not Found',
            //             icon: 'pi pi-fw pi-exclamation-circle',
            //             routerLink: ['/dashboard/notfound']
            //         },
            //         {
            //             label: 'Empty',
            //             icon: 'pi pi-fw pi-circle-off',
            //             routerLink: ['/dashboard/pages/empty']
            //         },
            //     ]
            // },
            // {
            //     label: 'Hierarchy',
            //     items: [
            //         {
            //             label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
            //                     ]
            //                 },
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //             ]
            //         }
            //     ]
            // },
            // {
            //     label: 'Get Started',
            //     items: [
            //         {
            //             label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/dashboard/documentation']
            //         },
            //         {
            //             label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
            //         }
            //     ]
            // }
        ];
    }
}
