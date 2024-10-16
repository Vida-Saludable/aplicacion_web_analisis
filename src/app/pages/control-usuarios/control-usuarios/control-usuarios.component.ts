import { Component, inject, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';  // Asegúrate de importar ConfirmationService
import { User } from 'src/app/models/user.model';
import { Roles } from 'src/app/models/roles.model';
import { RolesService } from 'src/app/services/roles.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-control-usuarios',
  templateUrl: './control-usuarios.component.html',
  styleUrls: ['./control-usuarios.component.scss'],
  providers: [ConfirmationService]  // Añadir ConfirmationService a los providers
})
export class ControlUsuariosComponent implements OnInit {
  private users$ = inject(UserService);
  private roles$ = inject(RolesService);
  roles: Roles[] = [];
  selectedRole: number;
  userslist: User[] = [];
  loading: boolean = true;

  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);  // Injectar ConfirmationService

  ngOnInit(): void {
    this.getUsersbyProject();
    this.getRoles();
  }

  getRoles() {  
    this.roles$.getRoles().subscribe(
      (data: Roles[]) => this.roles = data,
      error => console.error('Error fetching roles', error)
    );
  }

  getRoleName(roleId: number): string {
    const role = this.roles.find(r => r.id === roleId);
    return role ? role.name : 'Sin rol asignado';
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

  // Confirmación de eliminación del usuario
  confirmDelete(userId: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar este usuario?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.deleteUser(userId);  // Proceder con la eliminación si se acepta
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'No se eliminó el usuario' });
      }
    });
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
