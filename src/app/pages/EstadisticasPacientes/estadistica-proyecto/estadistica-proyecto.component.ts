import { Component, OnInit, inject } from '@angular/core';
import { IndicatorByProject } from 'src/app/models/indicatorByProyect.model';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-estadistica-proyecto',
  templateUrl: './estadistica-proyecto.component.html',
  styleUrls: ['./estadistica-proyecto.component.scss']
})
export class EstadisticaProyectoComponent implements OnInit {
  private indicatorByProjectService = inject(StatisticsService);
  public projectId: number = 4;
  indicatorByProject: IndicatorByProject;
  indicatorhealthReport: string[] = [];
  projectData: string[] = [];

  data: any;
  options: any;

  ngOnInit() {
    this.getIndicatorByProject(this.projectId);

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: [
        'Peso', 'Altura', 'IMC', 'Presión Sistólica', 'Presión Diastólica', 
        'Radio Abdominal', 'Grasa Corporal', 'Grasa Visceral', 'Frecuencia Cardiaca', 
        'Frecuencia Respiratoria', 'Colesterol Total', 'Colesterol HDL', 'Colesterol LDL', 
        'Triglicéridos', 'Glucosa', 'Frecuencia Cardiaca en Reposo', 
        'Frecuencia Cardiaca 45s', 'Frecuencia Cardiaca 1 min', 'Resultado Test Rufier'
      ],
      datasets: [
        {
          type: 'bar',
          label: 'Promedio',
          backgroundColor: 'rgba(54, 162, 235, 0.8)',  // Color azul con transparencia
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(54, 162, 235, 0.6)',
          hoverBorderColor: 'rgba(54, 162, 235, 1)',
          data: [67.25, 1.74, 25, 121.33, 79.5, 82.91, 16.75, 11.0, 70.0, 15.58, 199.08, 66.04, 129.12, 149.12, 89.12, 64.58, 81.0, 79.08, 10.14]
        },
        {
          type: 'bar',
          label: 'Máximo',
          backgroundColor: 'rgba(75, 192, 192, 0.8)',  // Color verde con transparencia
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 192, 192, 0.6)',
          hoverBorderColor: 'rgba(75, 192, 192, 1)',
          data: [100, 2.2, 40, 180, 120, 120, 30, 20, 100, 30, 300, 100, 200, 300, 140, 90, 120, 110, 15]
        },
        {
          type: 'bar',
          label: 'Usuario Actual',
          backgroundColor: 'rgba(255, 99, 132, 0.8)',  // Color rojo con transparencia
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 99, 132, 0.6)',
          hoverBorderColor: 'rgba(255, 99, 132, 1)',
          data: []  // Los datos serán asignados después de la llamada a la API
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(tooltipItem: any) {
              return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)}`;
            }
          }
        },
        legend: {
          labels: {
            color: textColor,
            font: {
              size: 14
            }
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textColor
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          stacked: false,
          ticks: {
            color: textColor,
            beginAtZero: true
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      },
      animation: {
        duration: 1500,
        easing: 'easeOutBounce'
      }
    };
  }

  getIndicatorByProject(projectId: number) {
    this.indicatorByProjectService.getProjectHealthIndicators(projectId).subscribe(
      response => {
        this.indicatorByProject = response;

        this.data.datasets[2].data = [
          response.peso.promedio,
          response.altura.promedio,
          response.imc.promedio,
          response.presion_sistolica.promedio,
          response.presion_diastolica.promedio,
          response.radio_abdominal.M.promedio,
          response.grasa_corporal.M.promedio,
          response.grasa_visceral.promedio,
          response.frecuencia_cardiaca.promedio,
          response.frecuencia_respiratoria.promedio,
          response.colesterol_total.promedio,
          response.colesterol_hdl.M.promedio,
          response.colesterol_ldl.promedio,
          response.trigliceridos.promedio,
          response.glucosa.promedio,
          response.frecuencia_cardiaca_en_reposo.promedio,
          response.frecuencia_cardiaca_despues_de_45_segundos.promedio,
          response.frecuencia_cardiaca_1_minuto_despues.promedio,
          response.resultado_test_ruffier.promedio
        ];

        this.generateHealthReport(this.indicatorByProject);
      },
      error => {
        console.error("Error al obtener los indicadores de salud del proyecto", error);
      }
    );
  }

  generateHealthReport(userData: IndicatorByProject) {
    this.indicatorhealthReport = [
      `Peso: Actualmente su peso es de ${userData.peso.promedio} kg, lo cual está considerado como ${userData.peso.status}.`,
      `Altura: Su altura de ${userData.altura.promedio} m está ${userData.altura.status}.`,
      `IMC: Su índice de masa corporal (IMC) es ${userData.imc.promedio}, lo que indica que se encuentra en ${userData.imc.status}.`,
      `Presión Sistólica: Su presión sistólica es de ${userData.presion_sistolica.promedio} mmHg, y está considerada como ${userData.presion_sistolica.status}.`,
      `Presión Diastólica: Su presión diastólica es de ${userData.presion_diastolica.promedio} mmHg, lo cual está ${userData.presion_diastolica.status}.`,
      `Radio Abdominal: El radio abdominal es de ${userData.radio_abdominal.F.promedio} cm. Para hombres, este valor está ${userData.radio_abdominal.M.promedio} y para mujeres, está ${userData.radio_abdominal.F.promedio}.`,
      `Grasa Corporal: Tiene un promedio de grasa corporal del ${userData.grasa_corporal.M.promedio}%, lo cual está ${userData.grasa_corporal.M.status} para hombres y ${userData.grasa_corporal.F.status} para mujeres.`,
      `Grasa Visceral: Su grasa visceral está en ${userData.grasa_visceral.promedio}, lo cual se considera ${userData.grasa_visceral.status}.`,
      `Frecuencia Cardiaca: Su frecuencia cardiaca en reposo es de ${userData.frecuencia_cardiaca.promedio} latidos por minuto, lo que se considera ${userData.frecuencia_cardiaca.status}.`,
      `Frecuencia Respiratoria: Tiene una frecuencia respiratoria de ${userData.frecuencia_respiratoria.promedio} respiraciones por minuto, lo que es ${userData.frecuencia_respiratoria.status}.`,
      `Colesterol Total: El colesterol total es de ${userData.colesterol_total.promedio} mg/dl, lo que se considera ${userData.colesterol_total.status}.`,
      `Colesterol HDL: Sus niveles de colesterol HDL son de ${userData.colesterol_hdl.M.promedio} mg/dl, considerados como ${userData.colesterol_hdl.M.status} para hombres y ${userData.colesterol_hdl.F.status} para mujeres.`,
      `Colesterol LDL: El colesterol LDL está en ${userData.colesterol_ldl.promedio} mg/dl, clasificado como ${userData.colesterol_ldl.status}.`,
      `Triglicéridos: Tiene triglicéridos a un nivel de ${userData.trigliceridos.promedio} mg/dl, considerados ${userData.trigliceridos.status}.`,
      `Glucosa: Sus niveles de glucosa en sangre son de ${userData.glucosa.promedio} mg/dl, lo que se considera ${userData.glucosa.status}.`,
      `Frecuencia Cardiaca en Reposo: Su frecuencia cardiaca en reposo es de ${userData.frecuencia_cardiaca_en_reposo.promedio} latidos por minuto, lo que se considera ${userData.frecuencia_cardiaca_en_reposo.status}.`,
      `Frecuencia Cardiaca 45 Segundos: Su frecuencia cardiaca en 45 segundos es de ${userData.frecuencia_cardiaca_despues_de_45_segundos.promedio}, considerada ${userData.frecuencia_cardiaca_despues_de_45_segundos.status}.`,
      `Frecuencia Cardiaca 1 Minuto: Su frecuencia cardiaca al minuto es de ${userData.frecuencia_cardiaca_1_minuto_despues.promedio}, lo que está en ${userData.frecuencia_cardiaca_1_minuto_despues.status}.`,
      `Test de Rufier: El resultado del test de Rufier es ${userData.resultado_test_ruffier.promedio}, lo que significa que está en un estado de salud ${userData.resultado_test_ruffier.status}.`
    ];
  }
}
