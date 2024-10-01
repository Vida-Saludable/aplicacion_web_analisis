import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VariableFisicaVariableHabitoComponent } from './variable-fisica-variable-habito/variable-fisica-variable-habito.component';
import { VariableFisicaVariableHabitoDeltasComponent } from './variable-fisica-variable-habito-deltas/variable-fisica-variable-habito-deltas.component';

@NgModule({
	imports: [RouterModule.forChild([
		{
            path: '',
            component: VariableFisicaVariableHabitoComponent
         },

         {
            path: 'VariableFisicaVariableHabito',
            component: VariableFisicaVariableHabitoComponent
         },

         {
            path: 'VariableFisicaVariableHabitoDeltas',
            component: VariableFisicaVariableHabitoDeltasComponent
         }
       

	])],
	exports: [RouterModule]
})
export class AnalisisPredictivoRoutingModule { }
