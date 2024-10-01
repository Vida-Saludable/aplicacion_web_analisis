import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicatorsInitialVsEnd } from 'src/app/models/indicatormainvsend.model';

import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-initial-versus-final-indicators',
  templateUrl: './initial-vs-end-indicators.component.html',
  styleUrls: ['./initial-vs-end-indicators.component.scss'] // Fíjate en la 's' extra en styleUrls
})
export class InitialVsEndIndicatorsComponent implements OnInit {

  private patients$ = inject(PatientsService);
  private router = inject(Router);
  private activateRoute = inject(ActivatedRoute);
  public listsindicatorMainvsEnd: IndicatorsInitialVsEnd[]; // Inicializa en null para evitar errores
  public id: number;

  constructor() {
    // Recupera el parámetro 'id' de la ruta
    this.id = Number(this.activateRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    // Llama al método para obtener los indicadores cuando se inicializa el componente
    this.getIndicatorsMainvsEnd(this.id);
  }

  getIndicatorsMainvsEnd(userId: number) {
    this.patients$.getIndicatorsMainvsEnd(userId).subscribe(
      response => {
        console.log(response); // Verifica los datos en la consola
        this.listsindicatorMainvsEnd = response; // Asigna la respuesta a la propiedad
      },
      error => {
        console.error('Error al obtener los indicadores:', error);
      }
    );
  }
}
