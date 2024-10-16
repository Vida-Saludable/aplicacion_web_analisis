import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryHabitsByUser } from 'src/app/models/history-habits.model';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-historial-de-usuarios',
  templateUrl: './historial-de-usuarios.component.html',
  styleUrls: ['./historial-de-usuarios.component.scss']
})
export class HistorialDeUsuariosComponent implements OnInit {

    private router = inject(Router);
    private activateRoute = inject(ActivatedRoute);
    private patients$ = inject(PatientsService);
    public historyHabits: HistoryHabitsByUser[] = [];
    public id: number;
    public chartData: any[] = [];  // Array para los diferentes gráficos
    public chartOptions: any;
  
    constructor() {
      this.id = Number(this.activateRoute.snapshot.paramMap.get('id'));
    }

    ngOnInit() {
        this.patients$.getHistoryHabitsByUsers(this.id).subscribe(
            (response) => {
                this.historyHabits = response;
                this.setupCharts();
            }
        );

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColor,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColor,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    setupCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        this.historyHabits.forEach((habit) => {
            this.chartData.push({
                labels: habit.historial.map(item => item[0]),  // Fechas del historial
                datasets: [
                    {
                        label: `${habit.habito} promedio`,
                        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        data: habit.historial.map(item => item[1])  // Valores del historial
                    }
                ]
            });
        });
    }
}
