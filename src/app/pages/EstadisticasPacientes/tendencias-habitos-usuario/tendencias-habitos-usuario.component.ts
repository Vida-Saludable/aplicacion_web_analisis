import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';  // Importar servicio para mostrar mensajes
import { localeES } from 'src/app/helpers/objectsCorrelations.ts/calendary';
import { HabitsByDates } from 'src/app/models/Habit.model';
import { StatisticsService } from 'src/app/services/statistics.service';
import { UserService, UsuarioPersonal } from 'src/app/services/user.service';

@Component({
  selector: 'app-tendencias-habitos-usuario',
  templateUrl: './tendencias-habitos-usuario.component.html',
  styleUrls: ['./tendencias-habitos-usuario.component.scss'],
  providers: [MessageService]  // Añadir el servicio en los proveedores
})
export class TendenciasHabitosUsuarioComponent implements OnInit {
  public locale = localeES; // Usar la configuración compartida
  public messages: any[] = []; // Agrega esta línea para inicializar messages
  private router = inject(Router);
  private activateRoute = inject(ActivatedRoute);
  private indicatorByUserService = inject(StatisticsService);
  private userService = inject(UserService);
  private messageService = inject(MessageService);  // Inyectar el servicio de mensajes

  public startDate: Date | null = null;
  public endDate: Date | null = null;
  public minDate: Date | null = null;
  public maxDate: Date | null = null;
  public fechasCargadas = false; // Nueva bandera para controlar si se reciben las fechas

  indicatorHabitsByUser: HabitsByDates;
  public userId: number | null = null;
  public data: any;
  public options: any;
  usuario:UsuarioPersonal 

  

  constructor() {
    this.userId = Number(this.activateRoute.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.getDateRangeByUser(this.userId);
    }
  }

  ngOnInit(): void {
    if (this.userId) {
      this.getDateRangeByUser(this.userId);
    }
    this.initializeChart();
    this.obtenerdatosDelUsuario()
  }

  obtenerdatosDelUsuario(){
    this.userService.getUsuarioPersonal(this.userId).subscribe(user=>{
      console.log("El usuario es",user)

        this.usuario=user
        console.log("El usuario es",this.usuario)
    })
  }
  initializeChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');

    this.data = {
      labels: ['Alimentación', 'Agua', 'Esperanza', 'Sol', 'Aire', 'Dormir', 'Ejercicio'],
      datasets: [
        {
          label: 'Hábitos del Usuario',
          borderColor: documentStyle.getPropertyValue('--bluegray-400'),
          pointBackgroundColor: documentStyle.getPropertyValue('--bluegray-400'),
          pointBorderColor: documentStyle.getPropertyValue('--bluegray-400'),
          pointHoverBackgroundColor: textColor,
          pointHoverBorderColor: documentStyle.getPropertyValue('--bluegray-400'),
          data: [0, 0, 0, 0, 0, 0, 0]  // Estos datos se actualizarán dinámicamente
        }
      ]
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        r: {
          grid: {
            color: textColorSecondary
          },
          pointLabels: {
            color: textColorSecondary
          },
          min: 0,
          max: 100  // Cada hábito será evaluado sobre 100
        }
      }
    };
  }

  // Obtener el rango de fechas para limitar el calendario
  getDateRangeByUser(userId: number) {
    this.indicatorByUserService.getDateRange(userId).subscribe(
      (response: { primera_fecha: Date, ultima_fecha: Date }) => {
        this.minDate = new Date(response.primera_fecha);
        this.maxDate = new Date(response.ultima_fecha);
        this.fechasCargadas = true; // Se establecen las fechas, permitir uso de calendario
      },
      error => {
        console.error("Error al obtener el rango de fechas", error);
        this.fechasCargadas = false; // Si falla, deshabilitar los calendarios
    this.messages.push({
        severity: 'warn',
        summary: 'Sin registros',
        detail: 'Este usuario no tiene registros de hábitos en ninguna fecha.'
      });
      this.messageService.add(this.messages[this.messages.length - 1]);
    }
  );
  }

  // Obtener los indicadores según el rango de fechas
  getIndicatorByUser(userId: number, startDate: Date, endDate: Date) {
    const start = startDate.toISOString().split('T')[0]; // Formato: 2024-08-15
    const end = endDate.toISOString().split('T')[0]; // Formato: 2024-08-15
  
    this.indicatorByUserService.getUsersHabitsByDates(userId, start, end).subscribe(
      response => {
        this.indicatorHabitsByUser = response;
        this.updateChart(response);
      },
      error => {
        console.error("Error al obtener los indicadores de hábitos", error);
      }
    );
  }
  
  updateChart(habitsData: HabitsByDates) {
    // Actualizar los datos del gráfico con los nuevos promedios de hábitos
    const updatedData = {
      ...this.data,  // Copiar el objeto original
      datasets: [
        {
          ...this.data.datasets[0],  // Mantener la configuración del dataset
          data: [
            habitsData.alimentacion.promedio,
            habitsData.agua.promedio,
            habitsData.esperanza.promedio,
            habitsData.sol.promedio,
            habitsData.aire.promedio,
            habitsData.dormir.promedio,
            habitsData.ejercicio.promedio
          ]
        }
      ]
    };
    
    // Asignar los nuevos datos para forzar la actualización
    this.data = updatedData;
  }

  isDateWithinRange(date: Date): boolean {
    return (this.minDate && this.maxDate && date >= this.minDate && date <= this.maxDate);
  }

  onDateChange() {
    if (this.startDate && this.endDate) {
      if (this.startDate > this.endDate) {
        this.messages.push({
          severity: 'error',
          summary: 'Error en las fechas',
          detail: 'La fecha de inicio no puede ser mayor que la fecha de fin.'
        });
        this.messageService.add(this.messages[this.messages.length - 1]); // Muestra el mensaje
      } else if (this.userId) {
        this.getIndicatorByUser(this.userId, this.startDate, this.endDate);
      }
    } else {
      console.warn("Fechas incompletas o userId no válido");
    }
  }
  
  
}
