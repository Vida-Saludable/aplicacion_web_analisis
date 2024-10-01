import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HealthStatistics } from 'src/app/models/indicatorByUser.model';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-estadistica-usuario',
  templateUrl: './estadistica-usuario.component.html',
  styleUrls: ['./estadistica-usuario.component.scss']
})
export class EstadisticaUsuarioComponent implements OnInit {
  private userService = inject(StatisticsService);
  private router = inject(Router);
  private activateRoute = inject(ActivatedRoute);
  private indicatorByUserService = inject(StatisticsService);

  public userId: number;
  public data: any;
  public options: any;
  public indicatorHealthReport: string[] = [];

  constructor() {
    this.userId = Number(this.activateRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.getIndicatorByUser(this.userId);
    this.initializeChart();
  }

  private initializeChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Datos de gráfico
    this.data = {
      labels: [
        'Peso', 'Altura', 'IMC', 'Presión Sistólica', 'Presión Diastólica',
        'Radio Abdominal', 'Grasa Corporal', 'Grasa Visceral', 'Frecuencia Cardiaca',
        'Frecuencia Respiratoria', 'Colesterol Total', 'Colesterol HDL', 'Colesterol LDL',
        'Triglicéridos', 'Glucosa', 'Temperatura', 'Saturación Oxígeno', 'Porcentaje Músculo',
        'Glicemia Basal', 'Frecuencia Cardiaca en Reposo', 'Frecuencia Cardiaca 45s',
        'Frecuencia Cardiaca 1 min', 'Resultado Test Rufier'
      ],
      datasets: [{
        type: 'bar',
        label: 'Promedio',
        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
        data: []
      }]
    };

    // Opciones del gráfico
    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltip: { mode: 'index', intersect: false },
        legend: { labels: { color: textColor } }
      },
      scales: {
        x: {
          stacked: true,
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder, drawBorder: false }
        },
        y: {
          stacked: false,
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder, drawBorder: false }
        }
      }
    };
  }

  getIndicatorByUser(userId: number) {
    this.indicatorByUserService.getUserHealthIndicators(userId).subscribe(
      (response: HealthStatistics) => {
        this.populateChartData(response);
        this.generateHealthReport(response);
      },
      error => {
        console.error("Error al obtener los indicadores de salud del usuario", error);
      }
    );
  }

  private populateChartData(response: HealthStatistics) {
    this.data.datasets[0].data = [
      response.peso.promedio,
      response.altura.promedio,
      response.imc.promedio,
      response.presion_sistolica.promedio,
      response.presion_diastolica.promedio,
      response.radio_abdominal.promedio,
      response.grasa_corporal.promedio,
      response.grasa_visceral.promedio,
      response.frecuencia_cardiaca.promedio,
      response.frecuencia_respiratoria.promedio,
      response.colesterol_total.promedio,
      response.colesterol_hdl.promedio,
      response.colesterol_ldl.promedio,
      response.trigliceridos.promedio,
      response.glucosa.promedio,
      response.temperatura.promedio,
      response.saturacion_oxigeno.promedio,
      response.porcentaje_musculo.promedio,
      response.glicemia_basal.promedio,
      response.frecuencia_cardiaca_en_reposo.promedio,
      response.frecuencia_cardiaca_despues_de_45_segundos.promedio,
      response.frecuencia_cardiaca_1_minuto_despues.promedio,
      response.resultado_test_ruffier.promedio
    ];
  }

  private generateHealthReport(response: HealthStatistics) {
    this.indicatorHealthReport = [
      `Peso: Actualmente su peso es de ${response.peso.promedio} kg, lo cual está considerado como ${response.peso.status}.`,
      `Altura: Su altura de ${response.altura.promedio} m está ${response.altura.status}.`,
      `IMC: Su índice de masa corporal (IMC) es ${response.imc.promedio}, lo que indica que se encuentra en ${response.imc.status}.`,
      `Presión Sistólica: Su presión sistólica es de ${response.presion_sistolica.promedio} mmHg, y está considerada como ${response.presion_sistolica.status}.`,
      `Presión Diastólica: Su presión diastólica es de ${response.presion_diastolica.promedio} mmHg, lo cual está ${response.presion_diastolica.status}.`,
      `Radio Abdominal: El radio abdominal es de ${response.radio_abdominal.promedio} cm, lo cual está ${response.radio_abdominal.status}.`,
      `Grasa Corporal: Tiene un promedio de grasa corporal del ${response.grasa_corporal.promedio}%, lo cual está ${response.grasa_corporal.status}.`,
      `Grasa Visceral: Su grasa visceral está en ${response.grasa_visceral.promedio}, lo cual se considera ${response.grasa_visceral.status}.`,
      `Frecuencia Cardiaca: Su frecuencia cardiaca es de ${response.frecuencia_cardiaca.promedio} latidos por minuto, lo que se considera ${response.frecuencia_cardiaca.status}.`,
      `Frecuencia Respiratoria: Tiene una frecuencia respiratoria de ${response.frecuencia_respiratoria.promedio} respiraciones por minuto, lo que es ${response.frecuencia_respiratoria.status}.`,
      `Colesterol Total: El colesterol total es de ${response.colesterol_total.promedio} mg/dl, lo que se considera ${response.colesterol_total.status}.`,
      `Colesterol HDL: Sus niveles de colesterol HDL son de ${response.colesterol_hdl.promedio} mg/dl, considerados ${response.colesterol_hdl.status}.`,
      `Colesterol LDL: El colesterol LDL está en ${response.colesterol_ldl.promedio} mg/dl, clasificado como ${response.colesterol_ldl.status}.`,
      `Triglicéridos: Tiene triglicéridos a un nivel de ${response.trigliceridos.promedio} mg/dl, considerados ${response.trigliceridos.status}.`,
      `Glucosa: Sus niveles de glucosa en sangre son de ${response.glucosa.promedio} mg/dl, lo que se considera ${response.glucosa.status}.`,
      `Temperatura: Su temperatura es de ${response.temperatura.promedio} °C, lo que se considera ${response.temperatura.status}.`,
      `Saturación de Oxígeno: Su saturación de oxígeno es de ${response.saturacion_oxigeno.promedio}%, lo que se considera ${response.saturacion_oxigeno.status}.`,
      `Porcentaje de Músculo: Su porcentaje de músculo es de ${response.porcentaje_musculo.promedio}%, lo cual está ${response.porcentaje_musculo.status}.`,
      `Glicemia Basal: Su glicemia basal es de ${response.glicemia_basal.promedio} mg/dl, lo que se considera ${response.glicemia_basal.status}.`,
      `Frecuencia Cardiaca en Reposo: Su frecuencia cardiaca en reposo es de ${response.frecuencia_cardiaca_en_reposo.promedio} latidos por minuto, lo que se considera ${response.frecuencia_cardiaca_en_reposo.status}.`,
      `Frecuencia Cardiaca después de 45 Segundos: Su frecuencia cardiaca después de 45 segundos es de ${response.frecuencia_cardiaca_despues_de_45_segundos.promedio}, considerada ${response.frecuencia_cardiaca_despues_de_45_segundos.status}.`,
      `Frecuencia Cardiaca 1 Minuto después: Su frecuencia cardiaca 1 minuto después es de ${response.frecuencia_cardiaca_1_minuto_despues.promedio}, lo que está en ${response.frecuencia_cardiaca_1_minuto_despues.status}.`,
      `Resultado del Test de Rufier: El resultado del test de Rufier es ${response.resultado_test_ruffier.promedio}, lo que significa que está en un estado de salud ${response.resultado_test_ruffier.status}.`
    ];
  }
}
