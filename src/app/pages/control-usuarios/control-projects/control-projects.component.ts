import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-projects',
  templateUrl: './control-projects.component.html',
  styleUrls: ['./control-projects.component.scss'],
  providers: [ConfirmationService]
})
export class ControlProjectsComponent {
  projects: any[] = [];
  loading: boolean = false;

  private projectService = inject(ProjectService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects() {
    this.loading = true;
    this.projectService.getAllProjects().subscribe({
      next: (response) => {
        this.projects = response;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar los proyectos.' });
      }
    });
  }

  confirmDelete(projectId: number) {
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este proyecto?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProject(projectId);
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'No se eliminó el proyecto' });
      }
    });
  }

  deleteProject(projectId: number) {
    this.projectService.deleteProject(projectId).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Proyecto eliminado correctamente.' });
        this.getAllProjects();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el proyecto.' });
      }
    });
  }

  editProject(projectId: number) {
    this.router.navigate([`/dashboard/controlUsuarios/projectos/${projectId}`]);
  }

  createProject() {
    this.router.navigate(['/dashboard/controlUsuarios/projectos/new']);
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
