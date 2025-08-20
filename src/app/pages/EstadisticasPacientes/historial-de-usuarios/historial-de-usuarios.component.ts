import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryHabitsByUser } from 'src/app/models/history-habits.model';
import { PatientsService } from 'src/app/services/patients.service';
import { UserService, UsuarioPersonal } from 'src/app/services/user.service';

@Component({
  selector: 'app-historial-de-usuarios',
  templateUrl: './historial-de-usuarios.component.html',
  styleUrls: ['./historial-de-usuarios.component.scss']
})
export class HistorialDeUsuariosComponent implements OnInit {

  private router = inject(Router);
  private activateRoute = inject(ActivatedRoute);
  private patients$ = inject(PatientsService);
  private userService = inject(UserService);

  public cargando: boolean = true;
  public sinDatos: boolean = false;

  public historyHabits: HistoryHabitsByUser[] = [];
  public id: number;
  public chartData: any[] = [];  // Array para los diferentes gráficos
  public chartOptions: any;
  usuario: UsuarioPersonal;

  constructor() {
    this.id = Number(this.activateRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.obtenerdatosDelUsuario();

    this.patients$.getHistoryHabitsByUsers(this.id).subscribe(
      (response) => {
        // 1) Redondear a 2 decimales al recibir
        this.historyHabits = (response ?? []).map(h => this.roundHistory(h));

        this.cargando = false;

        if (!this.historyHabits.length) {
          this.sinDatos = true;
        } else {
          this.setupCharts();
        }
      },
      (error) => {
        this.cargando = false;
        this.sinDatos = true;
        console.error("Error al obtener historial", error);
      }
    );

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // 2) Opcional: tooltip con 2 decimales
    this.chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: { color: textColor }
        },
        tooltip: {
          callbacks: {
            label: (ctx: any) => {
              const val = Number(ctx.raw);
              const num = Number.isFinite(val) ? val.toFixed(2) : ctx.raw;
              return `${ctx.dataset.label}: ${num}`;
            }
          }
        }
      },
      scales: {
        x: {
          ticks: { color: textColor },
          grid: { color: surfaceBorder, drawBorder: false }
        },
        y: {
          ticks: {
            color: textColor,
            // Opcional: mostrar ticks con 2 decimales
            callback: (value: any) => {
              const num = Number(value);
              return Number.isFinite(num) ? num.toFixed(2) : value;
            }
          },
          grid: { color: surfaceBorder, drawBorder: false }
        }
      }
    };
  }

  obtenerdatosDelUsuario() {
    this.userService.getUsuarioPersonal(this.id).subscribe(user => {
      this.usuario = user;
    });
  }

  // 3) Construir datasets usando los valores YA redondeados
  setupCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    this.chartData = []; // limpia por si acaso

    this.historyHabits.forEach((habit) => {
      this.chartData.push({
        labels: habit.historial.map(item => item[0]),  // Fechas
        datasets: [
          {
            label: `${habit.habito} promedio`,
            backgroundColor: documentStyle.getPropertyValue('--blue-500'),
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            data: habit.historial.map(item => item[1])  // Valores (ya redondeados)
          }
        ]
      });
    });
  }

  // === Helpers de redondeo ===
  private round2(n: number | null | undefined): number {
    const val = Number(n);
    if (!Number.isFinite(val)) return 0;
    return Number(val.toFixed(2));
  }

  private roundHistory(h: HistoryHabitsByUser): HistoryHabitsByUser {
    return {
      ...h,
      promedio: this.round2(h.promedio),
      historial: (h.historial ?? []).map(([fecha, val]) => [fecha, this.round2(val)]) as Array<[string, number]>,
    };
  }
}
