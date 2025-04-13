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
  public projectId: number;
  indicatorByProject: IndicatorByProject;
  indicatorhealthReport: string[] = [];
  // projectData: string[] = [];
  colorSummary: {darkRed: number, lightGreen: number, green: number, yellow: number, orange: number, red: number } = {darkRed:0, lightGreen :0, green: 0, yellow: 0, orange: 0, red: 0 };

  data: any;
  options: any;

  ngOnInit() {
    this.getProjectFromLocalStorage();
    this.getIndicatorByProject(this.projectId);

    

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels :[
        'Peso',
        // 'Altura',
        'IMC',
        'Radio abdominal (M)',
        'Radio abdominal (F)',
        'Porcentaje de músculo (M)',
        'Porcentaje de músculo (F)',
        'Grasa corporal (M)',
        'Grasa corporal (F)',
        'Grasa visceral',
        'Colesterol total',
        'Colesterol HDL (M)',
        'Colesterol HDL (F)',
        'Colesterol LDL',
        'Triglicéridos',
        'Glucosa',
        'Presión sistólica',
        'Presión diastólica',
        'Frecuencia cardíaca',
        'Frecuencia respiratoria',
        'Saturación de oxígeno',
        'Glicemia basal',
        'Temperatura',
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
  getProjectFromLocalStorage():void{
    // Obtenemos el proyecto desde el local storage
    const proyecto = localStorage.getItem('projectId');
    if(proyecto){
      this.projectId = parseInt(proyecto);
    } else {
      console.error('No hay proyecto seleccionado');
    }
  }

  getIndicatorByProject(projectId: number) {
    this.indicatorByProjectService.getProjectHealthIndicators(projectId).subscribe(
      response => {
        this.indicatorByProject = response;
        this.generateHealthReport(this.indicatorByProject);
        this.countColors(this.indicatorByProject);
        this.data.datasets[0].data = [
          response.peso.promedio,
          // response.altura.promedio,
          response.imc.promedio,
          response.radio_abdominal.M.promedio, // Radio abdominal (M)
          response.radio_abdominal.F.promedio, // Radio abdominal (F)
          response.porcentaje_musculo.M.promedio, // Porcentaje de músculo (M)
          response.porcentaje_musculo.F.promedio, // Porcentaje de músculo (F)
          response.grasa_corporal.M.promedio, // Grasa corporal (M)
          response.grasa_corporal.F.promedio, // Grasa corporal (F)
          response.grasa_visceral.promedio,
          response.colesterol_total.promedio,
          response.colesterol_hdl.M.promedio, // Colesterol HDL (M)
          response.colesterol_hdl.F.promedio, // Colesterol HDL (F)
          response.colesterol_ldl.promedio,
          response.trigliceridos.promedio,
          response.glucosa.promedio,
          response.presion_sistolica.promedio,
          response.presion_diastolica.promedio,
          response.frecuencia_cardiaca.promedio,
          response.frecuencia_respiratoria.promedio,
          response.saturacion_oxigeno.promedio,
          response.glicemia_basal.promedio,
          response.temperatura.promedio,
      ];
      

        // Populate the colors from the response
      // Populate the colors from the response
this.data.datasets[0].backgroundColor = [
  response.peso.data.color,
  // response.altura.data.color,
  response.imc.data.color,
  response.radio_abdominal.M.status.color, // Radio abdominal (M)
  response.radio_abdominal.F.status.color, // Radio abdominal (F)
  response.porcentaje_musculo.M.status.color, // Porcentaje de músculo (M)
  response.porcentaje_musculo.F.status.color, // Porcentaje de músculo (F)
  response.grasa_corporal.M.status.color, // Grasa corporal (M)
  response.grasa_corporal.F.status.color, // Grasa corporal (F)
  response.grasa_visceral.data.color,
  response.colesterol_total.data.color,
  response.colesterol_hdl.M.status.color, // Colesterol HDL (M)
  response.colesterol_hdl.F.status.color, // Colesterol HDL (F)
  response.colesterol_ldl.data.color,
  response.trigliceridos.data.color,
  response.glucosa.data.color,
  response.presion_sistolica.data.color,
  response.presion_diastolica.data.color,
  response.frecuencia_cardiaca.data.color,
  response.frecuencia_respiratoria.data.color,
  response.saturacion_oxigeno.data.color,
  response.glicemia_basal.data.color,
  response.temperatura.data.color,
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
      indicators.peso.data.color,                        // Peso
      // indicators.altura.data.color,                     // Altura
      indicators.imc.data.color,                        // IMC
      indicators.radio_abdominal.M.status.color,        // Radio abdominal (M)
      indicators.radio_abdominal.F.status.color,        // Radio abdominal (F)
      indicators.porcentaje_musculo.M.status.color,     // Porcentaje músculo (M)
      indicators.porcentaje_musculo.F.status.color,     // Porcentaje músculo (F)
      indicators.grasa_corporal.M.status.color,         // Grasa corporal (M)
      indicators.grasa_corporal.F.status.color,         // Grasa corporal (F)
      indicators.grasa_visceral.data.color,             // Grasa visceral
      indicators.colesterol_total.data.color,           // Colesterol total
      indicators.colesterol_hdl.M.status.color,         // Colesterol HDL (M)
      indicators.colesterol_hdl.F.status.color,         // Colesterol HDL (F)
      indicators.colesterol_ldl.data.color,             // Colesterol LDL
      indicators.trigliceridos.data.color,              // Triglicéridos
      indicators.glucosa.data.color,                    // Glucosa
      indicators.presion_sistolica.data.color,          // Presión sistólica
      indicators.presion_diastolica.data.color,         // Presión diastólica
      indicators.frecuencia_cardiaca.data.color,        // Frecuencia cardíaca
      indicators.frecuencia_respiratoria.data.color,    // Frecuencia respiratoria
      indicators.saturacion_oxigeno.data.color,         // Saturación de oxígeno
      indicators.glicemia_basal.data.color,             // Glicemia basal
      indicators.temperatura.data.color                 // Temperatura
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
      // `Altura: Su altura de ${userData.altura.promedio} cm está ${userData.altura.data.status}.`,
      `IMC: Su índice de masa corporal (IMC) es ${userData.imc.promedio} kg/m², lo que indica que se encuentra en ${userData.imc.data.status}.`,
      `Radio Abdominal: Para mujeres es de ${userData.radio_abdominal.F.promedio} cm (${userData.radio_abdominal.F.status.status}), y para hombres es de ${userData.radio_abdominal.M.promedio} cm (${userData.radio_abdominal.M.status.status}).`,
      `Porcentaje de Músculo: Para mujeres es ${userData.porcentaje_musculo.F.promedio}% (${userData.porcentaje_musculo.F.status.status}), y para hombres es ${userData.porcentaje_musculo.M.promedio}% (${userData.porcentaje_musculo.M.status.status}).`,
      `Grasa Corporal: Para mujeres es ${userData.grasa_corporal.F.promedio}% (${userData.grasa_corporal.F.status.status}), y para hombres es ${userData.grasa_corporal.M.promedio}% (${userData.grasa_corporal.M.status.status}).`,
      `Grasa Visceral: Su nivel de grasa visceral es ${userData.grasa_visceral.promedio}%, lo cual está ${userData.grasa_visceral.data.status}.`,
      `Colesterol Total: Su nivel de colesterol total es ${userData.colesterol_total.promedio} mg/dl (${userData.colesterol_total.data.status}).`,
      `Colesterol HDL: Para mujeres es ${userData.colesterol_hdl.F.promedio} mg/dl (${userData.colesterol_hdl.F.status.status}), y para hombres es ${userData.colesterol_hdl.M.promedio} mg/dl (${userData.colesterol_hdl.M.status.status}).`,
      `Colesterol LDL: Su nivel de colesterol LDL es ${userData.colesterol_ldl.promedio} mg/dl (${userData.colesterol_ldl.data.status}).`,
      `Triglicéridos: Sus triglicéridos están en ${userData.trigliceridos.promedio} mg/dl (${userData.trigliceridos.data.status}).`,
      `Glucosa: Sus niveles de glucosa son ${userData.glucosa.promedio} mg/dl (${userData.glucosa.data.status}).`,
      `Presión Sistólica: Su presión sistólica es de ${userData.presion_sistolica.promedio} mmHg (${userData.presion_sistolica.data.status}).`,
      `Presión Diastólica: Su presión diastólica es de ${userData.presion_diastolica.promedio} mmHg (${userData.presion_diastolica.data.status}).`,
      `Frecuencia Cardíaca: Su frecuencia cardiaca en reposo es de ${userData.frecuencia_cardiaca.promedio} latidos por minuto (${userData.frecuencia_cardiaca.data.status}).`,
      `Frecuencia Respiratoria: Su frecuencia respiratoria es de ${userData.frecuencia_respiratoria.promedio} respiraciones por minuto (${userData.frecuencia_respiratoria.data.status}).`,
      `Temperatura: Su temperatura corporal es de ${userData.temperatura.promedio}°C (${userData.temperatura.data.status}).`,
      `Saturación de Oxígeno: Su saturación de oxígeno es ${userData.saturacion_oxigeno.promedio}% (${userData.saturacion_oxigeno.data.status}).`,
    ];
    
  }
  

getCardTitle(index: number): string {
  const titles = [
    'Peso', 
    // 'Altura', 
    'IMC', 'Radio abdominal', 'Grasa corporal', 'Grasa visceral', 'Porcentaje de músculo',
        'Colesterol total', 'Colesterol HDL', 'Colesterol LDL', 'Triglicéridos', 'Glicemia basal',
        'Presión Sistólica', 'Presión diastólica', 'Frecuencia cardíaca', 'Frecuencia respiratoria', 
        'Temperatura', 'Saturación de oxígeno'
  ];
  return titles[index];
}





}


