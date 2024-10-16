import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
  isEdit: boolean = false;
  userId: number | null = null;

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
      contrasenia: [''], // Campo opcional al inicio
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRoles();
    this.userId = +this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.isEdit = true;
      this.loadUser(this.userId);
    } else {
      this.addPasswordControl();  // Solo al crear
    }
  }

  // Agregar el campo de contraseña solo si se está creando un usuario
  addPasswordControl(): void {
    this.userForm.get('contrasenia')?.setValidators(Validators.required);
    this.userForm.get('contrasenia')?.updateValueAndValidity();
  }

  // Cargar roles disponibles
  loadRoles(): void {
    this.rolesService.getRoles().subscribe((roles: Roles[]) => {
      this.roles = roles;
    });
  }

  // Cargar datos del usuario cuando se edita
  loadUser(id: number): void {
    this.userService.getUserById(id).subscribe((user: User) => {
      this.userForm.patchValue({
        nombre: user.nombre,
        correo: user.correo,
        role: user.role
      });
      this.userForm.removeControl('contrasenia');  // Quitar el control de contraseña al editar
    });
  }

  // Enviar el formulario
  // Enviar el formulario
  onSubmit(): void {
    if (this.userForm.valid) {
      // Extraer los datos del formulario y ajustar el rol para enviar solo su ID
      const userFormValue = { ...this.userForm.value, role: this.userForm.value.role.id || this.userForm.value.role }; 
  
      // Imprimir los valores del formulario en la consola
      console.log("Datos enviados al servicio:", userFormValue);
  
      if (this.isEdit && this.userId) {
        this.userService.updateUser(this.userId, userFormValue).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Usuario actualizado', detail: 'Usuario actualizado correctamente' });
            this.router.navigate(['/dashboard/controlUsuarios/usuarios']);
          },
          (error) => {
            console.error("Error al actualizar el usuario", error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el usuario' });
          }
        );
      } else {
        this.userService.register(
          userFormValue.nombre,
          userFormValue.correo,
          userFormValue.contrasenia,  // Contraseña solo requerida al crear
          userFormValue.role  // Enviar el ID del rol
        ).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Usuario creado', detail: 'Usuario creado correctamente' });
            this.router.navigate(['/dashboard/controlUsuarios/usuarios']);
          },
          (error) => {
            console.error("Error al crear el usuario", error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el usuario' });
          }
        );
      }
    }
  }
  


  onCancel(): void {
    this.router.navigate(['/usuarios']);
  }
}
