import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';  // Importa para los mensajes agradables
import { User } from 'src/app/models/user.model';
import { Roles } from 'src/app/models/roles.model';
import { RolesService } from 'src/app/services/roles.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-control-usuarios',
  templateUrl: './control-usuarios.component.html',
  styleUrls: ['./control-usuarios.component.scss'],

})
export class ControlUsuariosComponent implements OnInit {
  private users$ = inject(UserService);
  private roles$ = inject(RolesService);
  roles: Roles[] = [];
  selectedRole: number;
  userslist: User[] = [];
  loading: boolean = true;
  visible: boolean = false;
  isEdit: boolean = false;  // Para diferenciar entre agregar y editar
  user: User = { id: 0, nombre: '', correo: '', contrasenia: '', role: 0 };
  
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.getUsersbyProject();
    this.getRoles();
  }

  showDialog(isEdit: boolean = false, user?: User) {
    this.isEdit = isEdit;
    this.visible = true;
    if (isEdit && user) {
      this.user = { ...user };  // Clona el usuario a editar
      this.selectedRole = this.user.role;  // Asigna el rol actual al dropdown
    } else {
      this.user = { id: 0, nombre: '', correo: '', contrasenia: '', role: 0 };  // Inicializa un nuevo usuario
      this.selectedRole = 0;  // Reinicia el dropdown
    }
  }

  getRoles() {  
    this.roles$.getRoles().subscribe(
      (data: Roles[]) => this.roles = data,
      error => console.error('Error fetching roles', error)
    );
  }

  getRoleName(roleId: number): string {
    const role = this.roles.find(r => r.id === roleId);
    return role ? role.name : 'Sin rol asignado';  // Retorna el nombre o un texto si no encuentra el rol
  }

  getUsersbyProject() {
    this.users$.getUsers().subscribe(
      (data: User[]) => {
        this.userslist = data;
        this.loading = false;
      },
      error => {
        console.error('Error fetching users', error);
        this.loading = false;
      }
    );
  }

  registrer() {
    this.user.role = this.selectedRole;  // Asigna el rol seleccionado al usuario
    if (this.isEdit) {
      this.users$.updateUser(this.user.id, this.user).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario actualizado con éxito' });
          this.getUsersbyProject();  // Refresca la lista de usuarios
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el usuario' });
          console.error(error);
        }
      );
    } else {
      this.users$.register(this.user.nombre, this.user.correo, this.user.contrasenia, this.user.role).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario creado con éxito' });
          this.getUsersbyProject();  // Refresca la lista de usuarios
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el usuario' });
          console.error(error);
        }
      );
    }
    this.visible = false;
  }

  deleteUser(userId: number) {
    this.users$.deleteUserById(userId).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario eliminado con éxito' });
        this.getUsersbyProject();  // Refresca la lista de usuarios
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el usuario' });
        console.error(error);
      }
    );
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
