import { Component, OnInit, inject } from '@angular/core';
import { IndicatorByProject } from 'src/app/models/indicatorByProyect.model';
import { StatisticsService } from 'src/app/services/statistics.service';
const BACK = {
  GREEN: '#00FF00',        // Muy Bueno
  LIGHT_GREEN: '#32CD32',  // Bueno
  YELLOW: '#FFD700',       // Aceptable
  ORANGE: '#FFA500',       // Regular
  RED: '#FF4C4C',          // Malo
  DARK_RED: '#FF0000',     // Muy Malo
  NONE: '#d3d3d3'          // Sin dato
} as const;

type ColorCat = 'green' | 'lightGreen' | 'yellow' | 'orange' | 'red' | 'darkRed' | 'none';
  
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
  // Colores tal como llegan del backend (para CATEGORIZAR/CONTAR)


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
          label: 'Indicadores de Salud',
          data: [], // se llenará luego
          backgroundColor: [], // se llenará luego
          borderColor: '#000000',
          borderWidth: 1
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
          display: false,
          labels: {
            // display:false,
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
        console.log('DATA:', this.data.datasets[0].data);
        console.log('COLORES:', this.data.datasets[0].backgroundColor);
        this.indicatorByProject = response;
        this.generateHealthReport(this.indicatorByProject);
        this.countColors(this.indicatorByProject);
        console.log("los datos ",this.data.datasets[0].data)
        this.data.datasets[0].data = [
       
          this.safeValue(response.peso?.promedio),
  this.safeValue(response.imc?.promedio),
  this.safeValue(response.radio_abdominal?.M?.promedio),
  this.safeValue(response.radio_abdominal?.F?.promedio),
  this.safeValue(response.porcentaje_musculo?.M?.promedio),
  this.safeValue(response.porcentaje_musculo?.F?.promedio),
  this.safeValue(response.grasa_corporal?.M?.promedio),
  this.safeValue(response.grasa_corporal?.F?.promedio),
  this.safeValue(response.grasa_visceral?.promedio),
  this.safeValue(response.colesterol_total?.promedio),
  this.safeValue(response.colesterol_hdl?.M?.promedio),
  this.safeValue(response.colesterol_hdl?.F?.promedio),
  this.safeValue(response.colesterol_ldl?.promedio),
  this.safeValue(response.trigliceridos?.promedio),
  this.safeValue(response.glucosa?.promedio),
  this.safeValue(response.presion_sistolica?.promedio),
  this.safeValue(response.presion_diastolica?.promedio),
  this.safeValue(response.frecuencia_cardiaca?.promedio),
  this.safeValue(response.frecuencia_respiratoria?.promedio),
  this.safeValue(response.saturacion_oxigeno?.promedio),
  this.safeValue(response.glicemia_basal?.promedio),
  this.safeValue(response.temperatura?.promedio),

      ];

this.data.datasets[0].backgroundColor = [

  this.safeColor(response.peso?.data?.color),
  this.safeColor(response.imc?.data?.color),
  this.safeColor(response.radio_abdominal?.M?.status?.color),
  this.safeColor(response.radio_abdominal?.F?.status?.color),
  this.safeColor(response.porcentaje_musculo?.M?.status?.color),
  this.safeColor(response.porcentaje_musculo?.F?.status?.color),
  this.safeColor(response.grasa_corporal?.M?.status?.color),
  this.safeColor(response.grasa_corporal?.F?.status?.color),
  this.safeColor(response.grasa_visceral?.data?.color),
  this.safeColor(response.colesterol_total?.data?.color),
  this.safeColor(response.colesterol_hdl?.M?.status?.color),
  this.safeColor(response.colesterol_hdl?.F?.status?.color),
  this.safeColor(response.colesterol_ldl?.data?.color),
  this.safeColor(response.trigliceridos?.data?.color),
  this.safeColor(response.glucosa?.data?.color),
  this.safeColor(response.presion_sistolica?.data?.color),
  this.safeColor(response.presion_diastolica?.data?.color),
  this.safeColor(response.frecuencia_cardiaca?.data?.color),
  this.safeColor(response.frecuencia_respiratoria?.data?.color),
  this.safeColor(response.saturacion_oxigeno?.data?.color),
  this.safeColor(response.glicemia_basal?.data?.color),
  this.safeColor(response.temperatura?.data?.color),
];
console.log('DATA:', this.data.datasets[0].data); //NO llega aqui
console.log('COLORES:', this.data.datasets[0].backgroundColor);  //NO llega aqui

        

        // Update chart
        this.updateChart();
      },
      error => {
        console.error("Error al obtener los indicadores de salud del proyecto", error);
      }
    );
    
  }

  // Función para contar los colores
  countColors(ind: IndicatorByProject) {
  // Toma SIEMPRE los colores crudos que vienen del backend
  const rawColors = [
    ind.peso?.data?.color,
    ind.imc?.data?.color,
    ind.radio_abdominal?.M?.status?.color,
    ind.radio_abdominal?.F?.status?.color,
    ind.porcentaje_musculo?.M?.status?.color,
    ind.porcentaje_musculo?.F?.status?.color,
    ind.grasa_corporal?.M?.status?.color,
    ind.grasa_corporal?.F?.status?.color,
    ind.grasa_visceral?.data?.color,
    ind.colesterol_total?.data?.color,
    ind.colesterol_hdl?.M?.status?.color,
    ind.colesterol_hdl?.F?.status?.color,
    ind.colesterol_ldl?.data?.color,
    ind.trigliceridos?.data?.color,
    ind.glucosa?.data?.color,
    ind.presion_sistolica?.data?.color,
    ind.presion_diastolica?.data?.color,
    ind.frecuencia_cardiaca?.data?.color,
    ind.frecuencia_respiratoria?.data?.color,
    ind.saturacion_oxigeno?.data?.color,
    ind.glicemia_basal?.data?.color,
    ind.temperatura?.data?.color,
  ];

  // Reinicia
  this.colorSummary = { darkRed: 0, lightGreen: 0, green: 0, yellow: 0, orange: 0, red: 0 };

  // Cuenta por categoría
  for (const c of rawColors) {
    const cat = this.getCategory(c);
    if (cat !== 'none') (this.colorSummary as any)[cat] += 1;
  }
}


  updateChart() {
    this.data = {
      ...this.data,
      datasets: [{
        ...this.data.datasets[0],
        data: [...this.data.datasets[0].data],
        backgroundColor: [...this.data.datasets[0].backgroundColor]
      }]
    };
  }
  



  generateHealthReport(userData: IndicatorByProject) {
    this.indicatorhealthReport = [
      `Peso: Actualmente su peso es de ${userData.peso?.promedio ?? 'N/A'} kg, lo cual está considerado como ${userData.peso?.data?.status ?? 'Sin dato'}.`,
      `IMC: Su índice de masa corporal (IMC) es ${userData.imc?.promedio ?? 'N/A'} kg/m², lo que indica que se encuentra en ${userData.imc?.data?.status ?? 'Sin dato'}.`,
      `Radio Abdominal: Para mujeres es de ${userData.radio_abdominal?.F?.promedio ?? 'N/A'} cm (${userData.radio_abdominal?.F?.status?.status ?? 'Sin dato'}), y para hombres es de ${userData.radio_abdominal?.M?.promedio ?? 'N/A'} cm (${userData.radio_abdominal?.M?.status?.status ?? 'Sin dato'}).`,
      `Porcentaje de Músculo: Para mujeres es ${userData.porcentaje_musculo?.F?.promedio ?? 'N/A'}% (${userData.porcentaje_musculo?.F?.status?.status ?? 'Sin dato'}), y para hombres es ${userData.porcentaje_musculo?.M?.promedio ?? 'N/A'}% (${userData.porcentaje_musculo?.M?.status?.status ?? 'Sin dato'}).`,
      `Grasa Corporal: Para mujeres es ${userData.grasa_corporal?.F?.promedio ?? 'N/A'}% (${userData.grasa_corporal?.F?.status?.status ?? 'Sin dato'}), y para hombres es ${userData.grasa_corporal?.M?.promedio ?? 'N/A'}% (${userData.grasa_corporal?.M?.status?.status ?? 'Sin dato'}).`,
      `Grasa Visceral: Su nivel de grasa visceral es ${userData.grasa_visceral?.promedio ?? 'N/A'}%, lo cual está ${userData.grasa_visceral?.data?.status ?? 'Sin dato'}.`,
      `Colesterol Total: Su nivel de colesterol total es ${userData.colesterol_total?.promedio ?? 'N/A'} mg/dl (${userData.colesterol_total?.data?.status ?? 'Sin dato'}).`,
      `Colesterol HDL: Para mujeres es ${userData.colesterol_hdl?.F?.promedio ?? 'N/A'} mg/dl (${userData.colesterol_hdl?.F?.status?.status ?? 'Sin dato'}), y para hombres es ${userData.colesterol_hdl?.M?.promedio ?? 'N/A'} mg/dl (${userData.colesterol_hdl?.M?.status?.status ?? 'Sin dato'}).`,
      `Colesterol LDL: Su nivel de colesterol LDL es ${userData.colesterol_ldl?.promedio ?? 'N/A'} mg/dl (${userData.colesterol_ldl?.data?.status ?? 'Sin dato'}).`,
      `Triglicéridos: Sus triglicéridos están en ${userData.trigliceridos?.promedio ?? 'N/A'} mg/dl (${userData.trigliceridos?.data?.status ?? 'Sin dato'}).`,
      `Glucosa: Sus niveles de glucosa son ${userData.glucosa?.promedio ?? 'N/A'} mg/dl (${userData.glucosa?.data?.status ?? 'Sin dato'}).`,
      `Presión Sistólica: Su presión sistólica es de ${userData.presion_sistolica?.promedio ?? 'N/A'} mmHg (${userData.presion_sistolica?.data?.status ?? 'Sin dato'}).`,
      `Presión Diastólica: Su presión diastólica es de ${userData.presion_diastolica?.promedio ?? 'N/A'} mmHg (${userData.presion_diastolica?.data?.status ?? 'Sin dato'}).`,
      `Frecuencia Cardíaca: Su frecuencia cardiaca en reposo es de ${userData.frecuencia_cardiaca?.promedio ?? 'N/A'} latidos por minuto (${userData.frecuencia_cardiaca?.data?.status ?? 'Sin dato'}).`,
      `Frecuencia Respiratoria: Su frecuencia respiratoria es de ${userData.frecuencia_respiratoria?.promedio ?? 'N/A'} respiraciones por minuto (${userData.frecuencia_respiratoria?.data?.status ?? 'Sin dato'}).`,
      `Temperatura: Su temperatura corporal es de ${userData.temperatura?.promedio ?? 'N/A'}°C (${userData.temperatura?.data?.status ?? 'Sin dato'}).`,
      `Saturación de Oxígeno: Su saturación de oxígeno es ${userData.saturacion_oxigeno?.promedio ?? 'N/A'}% (${userData.saturacion_oxigeno?.data?.status ?? 'Sin dato'}).`,
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


// Si el valor es null o undefined, devuelve 0 (la barra se verá vacía)
safeValue(value: number | null | undefined): number {
  return value ?? 0;
}

// Si el color es null o undefined, usa un gris para "sin dato"
// Mapear colores del backend a otros más perceptibles en el frontend
// safeColor(color: string | null | undefined): string {
//   const colorMap: { [key: string]: string } = {
//     '#00FF00': '#009E73',   // Muy Bueno → Verde fuerte azulado
//     '#32CD32': '#A6D854',   // Bueno → Verde lima claro
//     '#FFD700': '#FFD92F',   // Aceptable → Amarillo brillante
//     '#FFA500': '#FFB482',   // Regular → Durazno claro
//     '#FF4C4C': '#E41A1C',   // Malo → Rojo puro
//     '#FF0000': '#7F0000',   // Muy Malo → Rojo oscuro/marrón
//     '#d3d3d3': '#BDBDBD'    // Sin dato → Gris claro
//   };

//   return colorMap[color ?? '#d3d3d3'] ?? '#BDBDBD';
// }

safeColor(color: string | null | undefined): string {
  const displayMap: Record<string, string> = {
    [BACK.GREEN]: '#009E73',
    [BACK.LIGHT_GREEN]: '#A6D854',
    [BACK.YELLOW]: '#FFD92F',
    [BACK.ORANGE]: '#FFB482',
    [BACK.RED]: '#E41A1C',
    [BACK.DARK_RED]: '#7F0000',
    [BACK.NONE]: '#BDBDBD'
  };
  return displayMap[color ?? BACK.NONE] ?? '#BDBDBD';
}


getCategory(color?: string | null): ColorCat {
  switch (color) {
    case BACK.GREEN: return 'green';
    case BACK.LIGHT_GREEN: return 'lightGreen';
    case BACK.YELLOW: return 'yellow';
    case BACK.ORANGE: return 'orange';
    case BACK.RED: return 'red';
    case BACK.DARK_RED: return 'darkRed';
    default: return 'none';
  }
}



}


