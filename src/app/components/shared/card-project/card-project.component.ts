import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.modet';
// Revisa que el modelo esté correctamente importado

@Component({
  selector: 'app-card-project',
  templateUrl: './card-project.component.html',
  styleUrls: ['./card-project.component.scss']
})
export class CardProjectComponent {
  // Inyectamos el Router para la navegación
  constructor(private router: Router) {}

  // Recibimos el proyecto como Input
  @Input() project: Project;

  // Método que se ejecuta al hacer clic en la tarjeta
  onchangeProject(id: number) {
    // Guardamos el ID del proyecto en localStorage
    localStorage.setItem('projectId', id.toString());

    // Navegamos a la ruta /dashboard
    this.router.navigate(['/dashboard']);
  }
}
