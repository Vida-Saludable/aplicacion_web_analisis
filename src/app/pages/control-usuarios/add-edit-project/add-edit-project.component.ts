import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.modet';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.scss'],
  providers: [MessageService]
})
export class AddEditProjectComponent implements OnInit {
  projectForm!: FormGroup;
  isEdit = false;
  projectId: number | null = null;
  messages: any[] = [];

  public todayString: string = new Date().toISOString().split('T')[0];

  // Switch de activación del formulario
  formEnabled = true;

  // min dinámico para fecha_fin (siempre string)
  minFechaFin: string = this.todayString;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group(
      {
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        fecha_inicio: ['', Validators.required], // 'YYYY-MM-DD'
        fecha_fin: ['', Validators.required],     // 'YYYY-MM-DD'
        estado: [false]
      },
      { validators: this.fechaRangoValidator }
    );

    // Actualiza el min de fecha_fin cuando cambia fecha_inicio
    this.projectForm.get('fecha_inicio')?.valueChanges.subscribe((fi: string) => {
      if (fi) {
        this.minFechaFin = fi;
        const finCtrl = this.projectForm.get('fecha_fin');
        if (finCtrl?.value && new Date(finCtrl.value) < new Date(fi)) {
          finCtrl.setValue('');
        }
      } else {
        this.minFechaFin = this.todayString;
      }
    });

    // Cargar si es edición
    const idParam = this.route.snapshot.paramMap.get('id');
    this.projectId = idParam ? +idParam : null;
    if (this.projectId) {
      this.isEdit = true;
      this.loadProject(this.projectId);
    }
  }

  // Validador de rango de fechas (strings comparadas como Date solo para validación)
  private fechaRangoValidator = (group: AbstractControl) => {
    const inicio = group.get('fecha_inicio')?.value;
    const fin = group.get('fecha_fin')?.value;
    if (inicio && fin && new Date(inicio) > new Date(fin)) {
      group.get('fecha_fin')?.setErrors({ rangoInvalido: true });
      return { rangoInvalido: true };
    }
    return null;
  };

  // Activa/Desactiva todo el form con el switch
  toggleFormEnabled(event: any): void {
    this.formEnabled = !!event?.checked;
    if (this.formEnabled) this.projectForm.enable({ emitEvent: false });
    else this.projectForm.disable({ emitEvent: false });
  }

  // Cargar proyecto para edición (normaliza a 'YYYY-MM-DD' por si backend devuelve ISO)
loadProject(id: number): void {
  this.projectService.getProjectById(id).subscribe((project: Project) => {
    const fi = this.toDateInputString(project.fecha_inicio as any); // '2025-08-19' → '2025-08-19'
    const ff = this.toDateInputString(project.fecha_fin as any);     // idem

    this.projectForm.patchValue({
      nombre: project.nombre,
      descripcion: project.descripcion,
      fecha_inicio: fi,
      fecha_fin: ff,
      estado: project.estado === 1
    });

    if (fi) this.minFechaFin = fi;
  });
}


  onSubmit(): void {
    if (this.projectForm.disabled) {
      this.messages = [{ severity: 'warn', summary: 'Formulario desactivado', detail: 'Activa el formulario para continuar.' }];
      return;
    }

    if (!this.projectForm.valid) {
      this.projectForm.markAllAsTouched();
      this.messages = [{ severity: 'warn', summary: 'Validación', detail: 'Revisa los campos obligatorios.' }];
      return;
    }

    const nombre: string = (this.projectForm.value.nombre || '').trim();
    const descripcion: string = (this.projectForm.value.descripcion || '').trim();

    // 🚩 Enviar SIEMPRE strings 'YYYY-MM-DD' que pide la API
    const fecha_inicio: string = this.projectForm.value.fecha_inicio;
    const fecha_fin: string = this.projectForm.value.fecha_fin;

    // Validaciones adicionales (solo para UX)
    const today = new Date(`${this.todayString}T00:00:00`);
    const fi = new Date(`${fecha_inicio}T00:00:00`);
    const ff = new Date(`${fecha_fin}T00:00:00`);
    if (fi < today) {
      this.messages = [{ severity: 'warn', summary: 'Fecha inválida', detail: 'La fecha de inicio no puede ser anterior al día de hoy.' }];
      return;
    }
    if (fi > ff) {
      this.messages = [{ severity: 'warn', summary: 'Fecha inválida', detail: 'La fecha de inicio no puede ser mayor que la fecha de fin.' }];
      return;
    }

    const payload = {
      nombre,
      descripcion,
      fecha_inicio, // 'YYYY-MM-DD'
      fecha_fin,    // 'YYYY-MM-DD'
      estado: this.projectForm.value.estado ? 1 : 0
    };

    if (this.isEdit && this.projectId) {
      this.projectService.updateProject(this.projectId, payload).subscribe(
        () => {
          this.messages = [{ severity: 'success', summary: 'Actualizado', detail: 'Proyecto actualizado correctamente.' }];
          this.router.navigate(['/dashboard/controlUsuarios/projectos']);
        },
        () => this.messages = [{ severity: 'error', summary: 'Error', detail: 'Error al actualizar el proyecto' }]
      );
    } else {
      this.projectService
        .registerProject(payload.nombre, payload.descripcion, payload.fecha_inicio, payload.fecha_fin, payload.estado)
        .subscribe(
          () => {
            this.messages = [{ severity: 'success', summary: 'Creado', detail: 'Proyecto creado correctamente.' }];
            this.router.navigate(['/dashboard/controlUsuarios/projectos']);
          },
          () => this.messages = [{ severity: 'error', summary: 'Error', detail: 'Error al crear el proyecto' }]
        );
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/controlUsuarios/projectos']);
  }

  /** Convierte Date o string a 'YYYY-MM-DD' seguro para <input type="date"> */
/** Devuelve 'YYYY-MM-DD' para inputs type="date" sin corrimientos de zona */
private toDateInputString(value: Date | string | null | undefined): string {
  if (!value) return '';

  if (typeof value === 'string') {
    // Si ya viene 'YYYY-MM-DD' o ISO, toma solo los 10 primeros
    return value.length >= 10 ? value.slice(0, 10) : '';
  }

  // Si es Date real, normaliza a local-date → 'YYYY-MM-DD'
  const ms = value.getTime() - value.getTimezoneOffset() * 60000;
  return new Date(ms).toISOString().slice(0, 10);
}

}
