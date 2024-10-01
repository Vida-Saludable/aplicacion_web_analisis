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
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    ControlUsuariosComponent
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


  ],
  providers: [MessageService]  // Añadido para los mensajes
})
export class ControlUsuariosModule { }
