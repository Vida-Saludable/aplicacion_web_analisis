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
                    { label: 'home', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
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
                       
                        ]
                    },
                ]
            },
            {
                label: 'Reglas y Operativa',
                items: [
                    { label: 'Reglas y Dinamica operativa', icon: 'pi pi-fw pi-sitemap', routerLink: ['/dashboard/Reglas'] }
                ]
            },
            {
                label: 'Seguimiento Pacientes',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    { label: 'Seguimiento a Pacientes', icon: 'pi pi-fw pi-user-plus', routerLink: ['/dashboard/SeguimientoPacientes'] },
                    { label: 'Seguimiento a Pacientes', icon: 'pi pi-fw pi-user-plus', routerLink: ['/dashboard/SeguimientoPacientes'] },
                    { label: 'Seguimiento a Pacientes', icon: 'pi pi-fw pi-user-plus', routerLink: ['/dashboard/SeguimientoPacientes'] }
                ]
            },
         
         
            {
                label: 'Control Usuarios',
                items: [
                    { label: 'Control de Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/dashboard/ControlUsuarios'] }
                ]
            },

           
            {
                label: 'Investigaciones',
                items: [
                    { label: 'Investigaciones', icon: 'pi pi-fw pi-file', routerLink: ['/dashboard/Investigaciones'] }
                ]
            },
            {
                label: 'Configuración',
                items: [
                    { label: 'Configuracion', icon: 'pi pi-fw pi-cog', routerLink: ['/dashboard/Configuracion'] }
                ]
            },
        
          


            
          
            {
                label: 'UI Components',
                items: [
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                    { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                    { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                    { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
                    { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
                ]
            },
            {
                label: 'Prime Blocks',
                items: [
                    { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
                    { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                ]
            },
            {
                label: 'Utilities',
                items: [
                    { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
                    { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing']
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Timeline',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/timeline']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    },
                ]
            },
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label: 'Get Started',
                items: [
                    {
                        label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
                    },
                    {
                        label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
                    }
                ]
            }
        ];
    }
}
