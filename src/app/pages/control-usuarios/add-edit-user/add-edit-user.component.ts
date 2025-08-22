import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';
import { RolesService } from 'src/app/services/roles.service';
import { Roles } from 'src/app/models/roles.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  userForm: FormGroup;
  roles: Roles[] = [];
  isEdit = false;
  userId: number | null = null;

  // evita doble click en Crear/Actualizar
  submitting = false;
  correoServerError = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private rolesService: RolesService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: [''],              // requerido solo en crear
      role: [null, Validators.required] // ⚠️ trabajaremos con el ID (number)
    });
  }

  ngOnInit(): void {
    this.loadRoles();

    const idParam = this.route.snapshot.paramMap.get('id');
    this.userId = idParam ? +idParam : null;

    if (this.userId) {
      this.isEdit = true;
      this.loadUser(this.userId);
      // en edición, no pedimos contraseña
      this.userForm.get('contrasenia')?.clearValidators();
      this.userForm.get('contrasenia')?.updateValueAndValidity();
    } else {
      // en creación, contraseña requerida
      this.addPasswordControl();
    }
  }

  // Contraseña requerida solo al crear
  private addPasswordControl(): void {
    this.userForm.get('contrasenia')?.setValidators(Validators.required);
    this.userForm.get('contrasenia')?.updateValueAndValidity();
  }

  // Cargar roles (filtrando Paciente si corresponde)
  private loadRoles(): void {
    this.rolesService.getRoles().subscribe((roles: Roles[]) => {
      this.roles = roles.filter(r => r.name !== 'Paciente');
      // si ya hay un valor numérico en role (por ejemplo, porque cargó el user antes),
      // el dropdown lo mostrará correctamente ahora que ya tiene las options.
    });
  }

  // Cargar datos del usuario a editar
  private loadUser(id: number): void {
    this.userService.getUserById(id).subscribe((user: User) => {
      // El backend devuelve role como ID (number). Perfecto para optionValue="id".
      this.userForm.patchValue({
        nombre: user.nombre,
        correo: user.correo,
        role: user.role          // <-- solo el ID
      });
      // En edición NO enviamos ni mostramos contraseña
      this.userForm.get('contrasenia')?.reset();
    });
  }

onSubmit(): void {
    if (this.submitting) return;
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    const roleValue = this.userForm.value.role;
    const roleId = (roleValue && typeof roleValue === 'object') ? roleValue.id : roleValue;

    const payload = {
      nombre: this.userForm.value.nombre,
      correo: this.userForm.value.correo,
      role: roleId
    };

    if (this.isEdit && this.userId) {
      this.userService.updateUser(this.userId, payload)
        .pipe(finalize(() => this.submitting = false))
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Usuario actualizado', detail: 'Usuario actualizado correctamente' });
            this.router.navigate(['/dashboard/controlUsuarios/usuarios']);
          },
          error: (err) => this.handleApiError(err, 'actualizar')
        });
    } else {
      const password = this.userForm.value.contrasenia;
      this.userService.register(payload.nombre, payload.correo, password, payload.role)
        .pipe(finalize(() => this.submitting = false))
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Usuario creado', detail: 'Usuario creado correctamente' });
            this.router.navigate(['/dashboard/controlUsuarios/usuarios']);
          },
          error: (err) => this.handleApiError(err, 'crear')
        });
    }
  }


  private handleApiError(err: any, accion: 'crear' | 'actualizar') {
    console.error(`Error al ${accion} el usuario`, err);

    const backend = err?.error;
    const correoMsgs: string[] | string | undefined =
      backend?.correo || backend?.email || backend?.errors?.correo || backend?.errors?.email;

    if (correoMsgs) {
      // Mensaje legible
      const msg = Array.isArray(correoMsgs) ? correoMsgs[0] : String(correoMsgs);
      this.correoServerError = this.toSpanishCorreoMsg(msg);

      // Marca el control con un error “emailTaken”
      const ctrl = this.userForm.get('correo');
      ctrl?.setErrors({ ...(ctrl?.errors || {}), emailTaken: true });
      ctrl?.markAsTouched();

      // Toast
      this.messageService.add({
        severity: 'warn',
        summary: 'Correo ya registrado',
        detail: this.correoServerError
      });
      this.submitting = false;
      return;
    }

    // Fallback genérico
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: backend?.detail || 'No se pudo completar la operación.'
    });
    this.submitting = false;
  }

    private toSpanishCorreoMsg(msg: string): string {
    // Ej: "usuario with this correo already exists."
    if (/already exists/i.test(msg)) return 'Ya existe un usuario con este correo.';
    if (/taken|in use/i.test(msg))  return 'El correo ya está en uso.';
    return msg;
  }

  onCancel(): void {
    if (this.submitting) return; // bloquear mientras envía
    this.router.navigate(['/dashboard/controlUsuarios/usuarios']);
  }
}
