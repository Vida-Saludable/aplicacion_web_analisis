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
    usuario:UsuarioPersonal 
  
    constructor() {
      this.id = Number(this.activateRoute.snapshot.paramMap.get('id'));
    }

    ngOnInit() {
        this.obtenerdatosDelUsuario()
        this.patients$.getHistoryHabitsByUsers(this.id).subscribe(
            (response) => {
              this.historyHabits = response;
              this.cargando = false;
        
              if (!response || response.length === 0) {
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

    obtenerdatosDelUsuario(){
        this.userService.getUsuarioPersonal(this.id).subscribe(user=>{
          console.log("El usuario es",user)
    
            this.usuario=user
            console.log("El usuario es",this.usuario)
        })
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
