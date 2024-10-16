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
  // projectData: string[] = [];
  colorSummary: {darkRed: number, lightGreen: number, green: number, yellow: number, orange: number, red: number } = {darkRed:0, lightGreen :0, green: 0, yellow: 0, orange: 0, red: 0 };

  data: any;
  options: any;

  ngOnInit() {
    this.getIndicatorByProject(this.projectId);

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: [
        'Peso', 'Altura', 'IMC', 'Radio Abdominal', 'Grasa Corporal', 'Grasa Visceral', 'Porcentaje de Músculo',
        'Colesterol Total', 'Colesterol HDL', 'Colesterol LDL', 'Triglicéridos', 'Glicemia Basal',
        'Presión Sistólica', 'Presión Diastólica', 'Frecuencia Cardíaca', 'Frecuencia Respiratoria', 
        'Temperatura', 'Saturación de Oxígeno', 'Frecuencia Cardíaca en Reposo', 
        'Frecuencia Cardíaca Después de 45 Segundos', 'Frecuencia Cardíaca 1 Minuto Después', 
        'Resultado del Test de Ruffier'
      ],
      datasets: [
        {
          type: 'bar',
          label: 'Verde claro=  Bueno', // Explanation of color scheme
          backgroundColor: '#32CD32', // Colors will be dynamically populated
          borderColor: '#00FF00',
        
        },
        {
          type: 'bar',
          label: 'Verde = Muy Bueno',
          backgroundColor: '#32CD32',  // Color rojo con transparencia
    

        },

        {
          type: 'bar',
          label: 'Amarillo = Aceptable',
          backgroundColor: '#FFD700',  // Color verde con transparencia
          
        },
        {
          type: 'bar',
          label: 'Naranja = Regular',
          backgroundColor: '#FFA500',  // Color rojo con transparencia
           // Los datos serán asignados después de la llamada a la API
        },

       
        {
          type: 'bar',
          label: 'Rojo = Malo',
          backgroundColor: '#FF4C4C',  // Color rojo con transparencia
      

        },
        {
          type: 'bar',
          label: 'Rojo Oscuro= Muy Malo',
          backgroundColor: '#FF0000',  // Color rojo con transparencia
      

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
            label: function (tooltipItem: any) {
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
        this.generateHealthReport(this.indicatorByProject);
        this.countColors(this.indicatorByProject);
        this.data.datasets[0].data = [
          response.peso.promedio,
          response.altura.promedio,
          response.imc.promedio,
          response.radio_abdominal.F.promedio || response.radio_abdominal.M.promedio, // Handling gender case
          response.grasa_corporal.F.promedio || response.grasa_corporal.M.promedio,   // Handling gender case
          response.grasa_visceral.promedio,
          response.porcentaje_musculo.F.promedio || response.porcentaje_musculo.M.promedio,  // Handling gender case
          response.colesterol_total.promedio,
          response.colesterol_hdl.F.promedio || response.colesterol_hdl.M.promedio,  // Handling gender case
          response.colesterol_ldl.promedio,
          response.trigliceridos.promedio,
          response.glicemia_basal.promedio,
          response.presion_sistolica.promedio,
          response.presion_diastolica.promedio,
          response.frecuencia_cardiaca.promedio,
          response.frecuencia_respiratoria.promedio,
          response.temperatura.promedio,
          response.saturacion_oxigeno.promedio,
          response.frecuencia_cardiaca_en_reposo.promedio,
          response.frecuencia_cardiaca_despues_de_45_segundos.promedio,
          response.frecuencia_cardiaca_1_minuto_despues.promedio,
          response.resultado_test_ruffier.promedio
        ];

        // Populate the colors from the response
        this.data.datasets[0].backgroundColor = [
          response.peso.data.color,
          response.altura.data.color,
          response.imc.data.color,
          response.radio_abdominal.F.status.color || response.radio_abdominal.M.status.color, // Gender handling
          response.grasa_corporal.F.status.color || response.grasa_corporal.M.status.color,   // Gender handling
          response.grasa_visceral.data.color,
          response.porcentaje_musculo.F.status.color || response.porcentaje_musculo.M.status.color,  // Gender handling
          response.colesterol_total.data.color,
          response.colesterol_hdl.F.status.color || response.colesterol_hdl.M.status.color,   // Gender handling
          response.colesterol_ldl.data.color,
          response.trigliceridos.data.color,
          response.glicemia_basal.data?.color,
          response.presion_sistolica.data.color,
          response.presion_diastolica.data.color,
          response.frecuencia_cardiaca.data.color,
          response.frecuencia_respiratoria.data.color,
          response.temperatura.data.color,
          response.saturacion_oxigeno.data.color,
          response.frecuencia_cardiaca_en_reposo.data.color,
          response.frecuencia_cardiaca_despues_de_45_segundos.data.color,
          response.frecuencia_cardiaca_1_minuto_despues.data.color,
          response.resultado_test_ruffier.data.color
        ];
        

        // Update chart
        this.updateChart();
      },
      error => {
        console.error("Error al obtener los indicadores de salud del proyecto", error);
      }
    );
    
  }

  // Función para contar los colores
  countColors(indicators: IndicatorByProject) {
    const allColors = [
      indicators.peso.data.color,
      indicators.altura.data.color,
      indicators.imc.data.color,
      indicators.radio_abdominal.M.status.color,
      indicators.radio_abdominal.F.status.color,
      indicators.grasa_corporal.M.status.color,
      indicators.grasa_corporal.F.status.color,
      indicators.grasa_visceral.data.color,
      indicators.colesterol_total.data.color,
      indicators.colesterol_hdl.M.status.color,
      indicators.colesterol_hdl.F.status.color,
      indicators.colesterol_ldl.data.color,
      indicators.trigliceridos.data.color,
      indicators.glucosa.data.color,
      indicators.presion_sistolica.data.color,
      indicators.presion_diastolica.data.color,
      indicators.frecuencia_cardiaca.data.color,
      indicators.frecuencia_respiratoria.data.color,
      indicators.saturacion_oxigeno.data.color,
      indicators.glicemia_basal.data.color,
      indicators.temperatura.data.color,
      indicators.frecuencia_cardiaca_en_reposo.data.color,
      indicators.frecuencia_cardiaca_despues_de_45_segundos.data.color,
      indicators.frecuencia_cardiaca_1_minuto_despues.data.color,
      indicators.resultado_test_ruffier.data.color
    ];

    this.colorSummary = { 
      darkRed:0, lightGreen:0, green: 0,  yellow: 0, orange: 0, red: 0 };

    allColors.forEach(color => {
      switch (color) {
        case '#00FF00':
          this.colorSummary.green += 1;
          break;
        case '#FFD700':
          this.colorSummary.yellow += 1;
          break;
        case '#32CD32':
            this.colorSummary.lightGreen += 1;
            break;
        case '#FFA500':
          this.colorSummary.orange += 1;
          break;
        case '#FF4C4C':
          this.colorSummary.red += 1;
          break;
      }
    });
  }

  updateChart() {
    // Force chart update
    if (this.data && this.options) {
      this.data = { ...this.data };
      this.options = { ...this.options };
    }
  }

  generateHealthReport(userData: IndicatorByProject) {
    this.indicatorhealthReport = [
      `Peso: Actualmente su peso es de ${userData.peso.promedio} kg, lo cual está considerado como ${userData.peso.data.status}.`,
      `Altura: Su altura de ${userData.altura.promedio} m está ${userData.altura.data.status}.`,
      `IMC: Su índice de masa corporal (IMC) es ${userData.imc.promedio}, lo que indica que se encuentra en ${userData.imc.data.status}.`,
      `Radio Abdominal: El radio abdominal es de ${userData.radio_abdominal.F.promedio} cm para mujeres y ${userData.radio_abdominal.M.promedio} cm para hombres, lo cual está ${userData.radio_abdominal.F.status.status} para mujeres y ${userData.radio_abdominal.M.status.status} para hombres.`,
      `Grasa Corporal: Tiene un promedio de grasa corporal de ${userData.grasa_corporal.F.promedio}% para mujeres (${userData.grasa_corporal.F.status.status}) y ${userData.grasa_corporal.M.promedio}% para hombres (${userData.grasa_corporal.M.status.status}).`,
      `Grasa Visceral: Su grasa visceral es ${userData.grasa_visceral.promedio}, lo cual está ${userData.grasa_visceral.data.status}.`,
      `Porcentaje de Músculo: El porcentaje de músculo es de ${userData.porcentaje_musculo.F.promedio}% para mujeres y ${userData.porcentaje_musculo.M.promedio}% para hombres, lo cual está ${userData.porcentaje_musculo.F.status.status} para mujeres y ${userData.porcentaje_musculo.M.status.status} para hombres.`,
      `Colesterol Total: Su nivel de colesterol total es ${userData.colesterol_total.promedio} mg/dl, lo cual está ${userData.colesterol_total.data.status}.`,
      `Colesterol HDL: Sus niveles de colesterol HDL son ${userData.colesterol_hdl.F.promedio} mg/dl para mujeres (${userData.colesterol_hdl.F.status.status}) y ${userData.colesterol_hdl.M.promedio} mg/dl para hombres (${userData.colesterol_hdl.M.status.status}).`,
      `Colesterol LDL: Su nivel de colesterol LDL es ${userData.colesterol_ldl.promedio} mg/dl, lo cual está ${userData.colesterol_ldl.data.status}.`,
      `Triglicéridos: Sus triglicéridos están en ${userData.trigliceridos.promedio} mg/dl, lo cual está ${userData.trigliceridos.data.status}.`,
      `Glicemia Basal: Sus niveles de glicemia basal son ${userData.glicemia_basal.promedio} mg/dl, lo cual está ${userData.glicemia_basal.data?.status || 'no disponible'}.`,
      `Presión Sistólica: Su presión sistólica es de ${userData.presion_sistolica.promedio} mmHg, y está considerada como ${userData.presion_sistolica.data.status}.`,
      `Presión Diastólica: Su presión diastólica es de ${userData.presion_diastolica.promedio} mmHg, lo cual está ${userData.presion_diastolica.data.status}.`,
      `Frecuencia Cardíaca: Su frecuencia cardiaca en reposo es de ${userData.frecuencia_cardiaca.promedio} latidos por minuto, lo cual está ${userData.frecuencia_cardiaca.data.status}.`,
      `Frecuencia Respiratoria: Tiene una frecuencia respiratoria de ${userData.frecuencia_respiratoria.promedio} respiraciones por minuto, lo cual está ${userData.frecuencia_respiratoria.data.status}.`,
      `Temperatura: Su temperatura corporal es de ${userData.temperatura.promedio}°C, lo cual está ${userData.temperatura.data.status}.`,
      `Saturación de Oxígeno: Su saturación de oxígeno es ${userData.saturacion_oxigeno.promedio}%, lo cual está ${userData.saturacion_oxigeno.data.status}.`,
      `Frecuencia Cardíaca en Reposo: Su frecuencia cardiaca en reposo es de ${userData.frecuencia_cardiaca_en_reposo.promedio} latidos por minuto, lo cual está ${userData.frecuencia_cardiaca_en_reposo.data.status}.`,
      `Frecuencia Cardíaca Después de 45 Segundos: Es de ${userData.frecuencia_cardiaca_despues_de_45_segundos.promedio} latidos por minuto, lo cual está ${userData.frecuencia_cardiaca_despues_de_45_segundos.data.status}.`,
      `Frecuencia Cardíaca 1 Minuto Después: Es de ${userData.frecuencia_cardiaca_1_minuto_despues.promedio} latidos por minuto, lo cual está ${userData.frecuencia_cardiaca_1_minuto_despues.data.status}.`,
      `Resultado del Test de Ruffier: El resultado del test de Ruffier es ${userData.resultado_test_ruffier.promedio}, lo que indica un estado de salud ${userData.resultado_test_ruffier.data.status}.`
    ];
  }
  

getCardTitle(index: number): string {
  const titles = [
    'Peso', 'Altura', 'IMC', 'Radio Abdominal', 'Grasa Corporal', 'Grasa Visceral', 'Porcentaje de Músculo',
        'Colesterol Total', 'Colesterol HDL', 'Colesterol LDL', 'Triglicéridos', 'Glicemia Basal',
        'Presión Sistólica', 'Presión Diastólica', 'Frecuencia Cardíaca', 'Frecuencia Respiratoria', 
        'Temperatura', 'Saturación de Oxígeno', 'Frecuencia Cardíaca en Reposo', 
        'Frecuencia Cardíaca Después de 45 Segundos', 'Frecuencia Cardíaca 1 Minuto Después', 
        'Resultado del Test de Ruffier'
  ];
  return titles[index];
}





}


