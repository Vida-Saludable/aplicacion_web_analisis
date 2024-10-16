import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlUsuariosRoutingModule } from './control-usuarios-routing.module';
import { TableModule } from 'primeng/table';
import { ControlUsuariosComponent } from './control-usuarios/control-usuarios.component';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ControlProjectsComponent } from './control-projects/control-projects.component';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    ControlUsuariosComponent,
    ControlProjectsComponent,
    AddEditProjectComponent,
    AddEditUserComponent
    
  ],
  imports: [
    CommonModule,
    ControlUsuariosRoutingModule,
    TableModule,
    InputTextModule,
    RippleModule,
    ToastModule,
    ButtonModule,
    DialogModule,
    AvatarModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    MessagesModule,
    ConfirmDialogModule 


  ],
  providers: [MessageService]  // Añadido para los mensajes
})
export class ControlUsuariosModule { }
