// project-uab.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.modet';
import { ProjectUser } from 'src/app/models/projectUser.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { RolesService } from 'src/app/services/roles.service';
import { UserService, UsuarioPersonal } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './project-uab.component.html',
  styleUrls: ['./project-uab.component.scss']
})
export class ProjecUabComponent implements OnInit {
  projects: Project[] = [];
  userProject: ProjectUser[] = [];
  filteredCards: Project[] = [];
  paginatedCards: Project[] = [];

  // paginación
  rows = 3;
  first = 0;

  // filtros
  searchQuery = '';
  startDate: Date | null = null;
  endDate: Date | null = null;

  // usuario
  usuario!: UsuarioPersonal;
  userRole!: string | null;
  userId!: number | null;

  projectId!: number | null;

  // KPIs (resumen)
  stats = { total: 0, activos: 0, finalizados: 0 };

  private project$ = inject(ProjectService);
  private rol = inject(RolesService);
  private userService = inject(UserService);

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    this.userId   = parseInt(this.authService.getUserid());
    this.obtenerdatosDelUsuario();

    this.obtenerUsuariosProyecto();
  }

  // getAllProject() {
  //   this.project$.getAllProjects().subscribe((response) => {
  //     // filtra por rol si es necesario
  //     console.log("los proyectos recuperados son 1", response);
  //     if (this.userRole === 'Administrador') {
  //       this.projects = response;
  //     } else {
  //       this.projects = response.filter(p => p.id === this.projectId);
  //       console.log("los proyectos recuperados son 2", this.projects);
  //     }

  //     // 1) ORDENAR POR ID ASCENDENTE (creación más nueva al final)
  //     this.sortProjectsAscById(this.projects);

  //     // 2) KPIs
  //     this.computeStats();

  //     // 3) aplicar al listado visible
  //     this.filteredCards = [...this.projects];
  //     this.first = 0;
  //     this.updatePaginatedCards();
  //   });
  // }
  getAllProject() {
  this.project$.getAllProjects().subscribe((response) => {
    console.log("los proyectos recuperados son 1", response);

    if (this.userRole === 'Administrador') {
      this.projects = response;
    } else if (this.projectId != null) {
      this.projects = response.filter(p => p.id === this.projectId);
    } else {
      this.projects = []; // aún no hay id; evita mostrar basura
    }

    this.sortProjectsAscById(this.projects);
    this.computeStats();
    this.filteredCards = [...this.projects];
    this.first = 0;
    this.updatePaginatedCards();
  });
}




  // obtenerUsuariosProyecto() {
  //   this.project$.getAllProjectsUsers().subscribe(userProject => {
  //     this.userProject = userProject;
  //     this.projectId = this.userProject.find(up => up.usuario === this.userId)?.proyecto ?? null;
  //     console.log("el id recuperado es ", this.projectId);

  //   });
  //   this.getAllProject();
  // }

  obtenerUsuariosProyecto() {
  this.project$.getAllProjectsUsers().subscribe(userProject => {
    this.userProject = userProject;
    this.projectId = this.userProject.find(up => up.usuario === this.userId)?.proyecto ?? null;
    console.log("el id recuperado es ", this.projectId);

    // ahora sí, con projectId listo
    this.getAllProject();
  });
}



  obtenerdatosDelUsuario() {
    if (!this.userId) return;
    this.userService.getUsuarioPersonal(this.userId).subscribe(user => {
      this.usuario = user;
    });
  }

  // ---- FILTROS ----
  onSearch(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
    this.applyFilters();
  }

  onStartDateChange(event: any) {
    this.startDate = event.target.value ? new Date(event.target.value) : null;
  }
  onEndDateChange(event: any) {
    this.endDate = event.target.value ? new Date(event.target.value) : null;
  }

  applyFilters() {
    // filtra sobre el conjunto total ya ordenado
    const filtered = this.projects.filter(project => {
      const q = this.searchQuery;
      const matchesSearch = project.nombre.toLowerCase().includes(q) ||
                            (project.descripcion || '').toLowerCase().includes(q);
      const matchesStart  = this.startDate ? new Date(project.fecha_inicio) >= this.startDate : true;
      const matchesEnd    = this.endDate ? new Date(project.fecha_fin)     <= this.endDate   : true;
      return matchesSearch && matchesStart && matchesEnd;
    });

    // mantiene el orden por ID ascendente
    this.filteredCards = filtered;
    this.first = 0;
    this.updatePaginatedCards();
  }

  // ---- PAGINACIÓN ----
  updatePaginatedCards() {
    const start = this.first;
    const end   = start + this.rows;
    this.paginatedCards = this.filteredCards.slice(start, end);
  }
  paginate(event: any) {
    this.first = event.first;
    this.rows  = event.rows;
    this.updatePaginatedCards();
  }

  // ---- UTIL ----
  private sortProjectsAscById(list: Project[]) {
    list.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
  }

  private computeStats() {
    this.stats.total      = this.projects.length;
    this.stats.activos    = this.projects.filter(p => p.estado === 1).length;
    this.stats.finalizados= this.stats.total - this.stats.activos;
  }
}
