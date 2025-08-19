import { Component, OnInit, inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { forkJoin, Observable } from 'rxjs';

import { PaginatedResponse } from 'src/app/models/pager/pager';
import { Project } from 'src/app/models/project.modet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  supervisorCount = 0;
  respSegCount = 0;
  tomDatosCount = 0;
  pacienteCount = 0;
  projectCount = 0;
  admin=0

  pieData: any;
  pieOptions: any;
  barData: any;
  barOptions: any;
   EASE = {
  linear: (t: number) => t,
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeOutExpo: (t: number) => (t === 0 ? 0 : 1 - Math.pow(2, -10 * t)),
};



  loading: boolean = true; // Variable de estado de carga

  private userService = inject(UserService);
  private projectService = inject(ProjectService);

  ngOnInit(): void {
    this.loadData();
    this.setupChartsOptions();
  }

  // Método para cargar los datos y contar por roles
loadData(): void {
  this.loading = true;

  forkJoin({
    users: this.userService.getUsers(),
    countByProject: this.userService.getCountUsersByProject() // o projectService si lo pusiste ahí
  }).subscribe(
    ({ users, countByProject }) => {
      // 1) roles (para las demás tarjetas/ gráfico de pie)
      this.processUsersData(users);

      // 2) construir gráfico de barras desde countByProject.data
      const rows = countByProject?.data ?? [];
      const labels = rows.map(r => r.nombre);
      const counts = rows.map(r => r.pacientes);

      this.projectCount = rows.length;

      this.barData = {
        labels,
        datasets: [
          { label: 'Pacientes por Proyecto', backgroundColor: '#42A5F5', data: counts }
        ]
      };

      // 3) TARJETA "Pacientes" = solo recuperados del endpoint
const pacientesSoloEnProyectos = counts.reduce((a, b) => a + b, 0);

// arranques desfasados 100ms entre tarjetas
this.animateCount('admin',           this.admin,              { duration: 2000, easing: 'easeOutCubic', staggerMs:   0 });
this.animateCount('supervisorCount', this.supervisorCount,    { duration: 2000, easing: 'easeOutCubic', staggerMs: 100 });
this.animateCount('respSegCount',    this.respSegCount,       { duration: 2000, easing: 'easeOutCubic', staggerMs: 200 });
this.animateCount('tomDatosCount',   this.tomDatosCount,      { duration: 2000, easing: 'easeOutCubic', staggerMs: 300 });
this.animateCount('pacienteCount',   pacientesSoloEnProyectos,{ duration: 2200, easing: 'easeOutExpo',  staggerMs: 400 });
this.animateCount('projectCount',    this.projectCount,       { duration: 1800, easing: 'linear',       staggerMs: 500 });

      this.loading = false;
    },
    error => {
      console.error('Error al cargar los datos:', error);
      this.loading = false;
    }
  );
}



// home.component.ts
private animateCount(
  prop: keyof HomeComponent,
  to: number,
  opts: { duration?: number; easing?: keyof typeof this.EASE; from?: number; staggerMs?: number } = {}
) {
  const duration = opts.duration ?? 2000;                // ⬅️ más lento (2s). Sube a 3000 si quieres
  const easing = this.EASE[opts.easing ?? 'easeOutCubic'];
  const from = (opts.from ?? (this as any)[prop]) ?? 0;
  const startDelay = opts.staggerMs ?? 0;

  const startAt = performance.now() + startDelay;

  const step = (now: number) => {
    if (now < startAt) {
      requestAnimationFrame(step);
      return;
    }
    const t = Math.min((now - startAt) / duration, 1);
    const eased = easing(t);
    const value = Math.round(from + (to - from) * eased);
    (this as any)[prop] = value;
    if (t < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

  // Procesar los datos de los usuarios y contar por roles
  processUsersData(users: any[]): void {
    console.log("Los usuario",users)
    this.admin= users.filter(user => user.role === 1).length;
    this.supervisorCount = users.filter(user => user.role === 2).length;
    this.respSegCount = users.filter(user => user.role === 3).length;
    this.tomDatosCount = users.filter(user => user.role === 4).length;
    this.pacienteCount = users.filter(user => user.role === 5).length;

    this.pieData = {
      labels: ['Administradores','Supervisores', 'Resp. Seguimiento', 'Tomadores de Datos', 'Pacientes'],
      datasets: [{
        data: [this.admin, this.supervisorCount, this.respSegCount, this.tomDatosCount, this.pacienteCount],
        backgroundColor: ['#25e035','#42A5F5', '#66BB6A', '#FFA726', '#FF7043'],
        hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D', '#FF8A65']
      }]
    };
  }


// home.component.ts
GetCountUsersByProject(): void {
  this.userService.getCountUsersByProject().subscribe({
    next: (resp) => {
      const rows = resp?.data ?? [];

      // etiquetas y valores para el bar chart
      const labels = rows.map(r => r.nombre);
      const counts = rows.map(r => r.pacientes);

      // cantidad de proyectos (tarjeta “Proyectos”)
      this.projectCount = rows.length;

      // datos del gráfico de barras
      this.barData = {
        labels,
        datasets: [
          {
            label: 'Pacientes por Proyecto',
            backgroundColor: '#42A5F5',
            data: counts
          }
        ]
      };
    },
    error: (err) => {
      console.error('Error al obtener conteo por proyecto', err);
      // en caso de error, deja el gráfico vacío
      this.barData = {
        labels: [],
        datasets: [{ label: 'Pacientes por Proyecto', backgroundColor: '#42A5F5', data: [] }]
      };
      this.projectCount = 0;
    }
  });
}


  // Configurar las opciones de los gráficos
 setupChartsOptions(): void {
  this.pieOptions = {
    plugins: { legend: { display: true, position: 'top' } },
    responsive: true
  };

  this.barOptions = {
    responsive: true,
   
    plugins: {
      legend: { display: true, position: 'top' }
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 30,
          minRotation: 30
        }
      },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 5 }
      }
    }
  };
}

}
