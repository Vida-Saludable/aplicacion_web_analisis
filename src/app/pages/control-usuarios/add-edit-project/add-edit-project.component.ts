import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.modet';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.scss'],
  providers: [MessageService]  // Añadir el MessageService
})
export class AddEditProjectComponent implements OnInit {
  projectForm: FormGroup;
  isEdit: boolean = false;
  projectId: number | null = null;
  messages: any[] = [];  // Declarar la variable para los mensajes

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projectForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      estado: [false]
    });
  }

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('id');
    if (this.projectId) {
      this.isEdit = true;
      this.loadProject(this.projectId);
    }
  }

  // Cargar los datos del proyecto para editar
  loadProject(id: number): void {
    this.projectService.getProjectById(id).subscribe((project: Project) => {
      this.projectForm.patchValue({
        nombre: project.nombre,
        descripcion: project.descripcion,
        fecha_inicio: project.fecha_inicio,
        fecha_fin: project.fecha_fin,
        estado: project.estado === 1
      });
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const projectData = {
        ...this.projectForm.value,
        estado: this.projectForm.value.estado ? 1 : 0
      };

      if (this.isEdit && this.projectId) {
        this.projectService.updateProject(this.projectId, projectData).subscribe(
          () => {
            this.messages = [{ severity: 'success', summary: 'Actualizado', detail: 'Proyecto actualizado correctamente.' }];
            this.router.navigate(['/dashboard/controlUsuarios/projectos']);
          },
          (error) => this.messages = [{ severity: 'error', summary: 'Error', detail: 'Error al actualizar el proyecto' }]
        );
      } else {
        this.projectService.registerProject(
          projectData.nombre,
          projectData.descripcion,
          projectData.fecha_inicio,
          projectData.fecha_fin,
          projectData.estado
        ).subscribe(
          () => {
            this.messages = [{ severity: 'success', summary: 'Creado', detail: 'Proyecto creado correctamente.' }];
            this.router.navigate(['/dashboard/controlUsuarios/projectos']);
          },
          (error) => this.messages = [{ severity: 'error', summary: 'Error', detail: 'Error al crear el proyecto' }]
        );
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/controlUsuarios/projectos']);
  }
}
