import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalisisPredictivoRoutingModule } from './analisis-predictivo-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { MessageService } from 'primeng/api';
import { VariableFisicaVariableHabitoDeltasComponent } from './variable-fisica-variable-habito-deltas/variable-fisica-variable-habito-deltas.component';
import { VariableFisicaVariableHabitoComponent } from './variable-fisica-variable-habito/variable-fisica-variable-habito.component';
import { MessagesModule } from 'primeng/messages';



@NgModule({
  declarations: [
    VariableFisicaVariableHabitoDeltasComponent,
    VariableFisicaVariableHabitoComponent

  ],
  imports: [
    CommonModule,
    AnalisisPredictivoRoutingModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    RadioButtonModule,
    ButtonModule,
    FieldsetModule,
    ToastModule,
    PanelModule,
    MessagesModule

  ],
  providers: [MessageService], // Asegúrate de agregar el servicio aquí
})
export class AnalisisPredictivoModule { }
