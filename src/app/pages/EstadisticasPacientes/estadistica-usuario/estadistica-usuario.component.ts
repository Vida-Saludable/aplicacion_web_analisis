import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicatorsByPatient } from 'src/app/models/indicatorByUser.model';

import { StatisticsService } from 'src/app/services/statistics.service';
import { UserService, UsuarioPersonal } from 'src/app/services/user.service';
// === Colores CRUDOS del backend (para CATEGORIZAR/CONTAR) ===
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
  selector: 'app-estadistica-usuario',
  templateUrl: './estadistica-usuario.component.html',
  styleUrls: ['./estadistica-usuario.component.scss']
})
export class EstadisticaUsuarioComponent implements OnInit {
  private indicatorByUserService = inject(StatisticsService);
  private userService = inject(UserService);
  private activateRoute = inject(ActivatedRoute);
  usuario:UsuarioPersonal 
  indicatorsByPatient: IndicatorsByPatient;
   indicatorHealthReport: string[] = [];
   public specificColorCount: number = 0;

  public userId: number;
  public data: any;
  public options: any;
  colorSummary: {darkRed: number, lightGreen: number, green: number, yellow: number, orange: number, red: number } = {darkRed:0, lightGreen :0, green: 0, yellow: 0, orange: 0, red: 0 };


  constructor() {
    this.userId = Number(this.activateRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.initializeChart();
    this.getIndicatorByUser(this.userId);
    
    this.obtenerdatosDelUsuario()
  }

  obtenerdatosDelUsuario(){
    this.userService.getUsuarioPersonal(this.userId).subscribe(user=>{
      console.log("El usuario es",user)

        this.usuario=user
        console.log("El usuario es",this.usuario)
    })
  }
 

  private initializeChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: [
        'Peso',               // peso
        // 'Altura',             // altura
        'IMC',                // imc
        'Radio Abdominal',    // radio_abdominal
        'Porcentaje de Músculo', // porcentaje_musculo
        'Grasa Corporal',     // grasa_corporal
        'Grasa Visceral',     // grasa_visceral
        'Colesterol Total',   // colesterol_total
        'Colesterol HDL',     // colesterol_hdl
        'Colesterol LDL',     // colesterol_ldl
        'Triglicéridos',      // trigliceridos
        'Glucosa',            // glucosa
        'Presión Sistólica',  // presion_sistolica
        'Presión Diastólica', // presion_diastolica
        'Frecuencia Cardíaca', // frecuencia_cardiaca
        'Frecuencia Respiratoria', // frecuencia_respiratoria
        'Saturación de Oxígeno',   // saturacion_oxigeno
        'Glicemia Basal',     // glicemia_basal
        'Temperatura'         // temperatura
    ],
    //   datasets: [
    //     {
    //       type: 'bar',
    //       label: 'Verde claro = Bueno', // Explanation of color scheme
    //       backgroundColor: '#32CD32', // Colors will be dynamically populated
    //       borderColor: '#00FF00',
        
    //     },
    //     {
    //       type: 'bar',
    //       label: 'Verde = Muy Bueno',
    //       backgroundColor: '#32CD32',  // Color rojo con transparencia
    

    //     },

    //     {
    //       type: 'bar',
    //       label: 'Amarillo = Aceptable',
    //       backgroundColor: '#FFD700',  // Color verde con transparencia
          
    //     },
    //     {
    //       type: 'bar',
    //       label: 'Naranja = Regular',
    //       backgroundColor: '#FFA500',  // Color rojo con transparencia
    //        // Los datos serán asignados después de la llamada a la API
    //     },

       
    //     {
    //       type: 'bar',
    //       label: 'Rojo = Malo',
    //       backgroundColor: '#FF4C4C',  // Color rojo con transparencia
      

    //     },
    //     {
    //       type: 'bar',
    //       label: 'Rojo Oscuro = Muy Malo',
    //       backgroundColor: '#FF0000',  // Color rojo con transparencia
      

    //     }
    // ]

    
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

  getIndicatorByUser(userId: number) {
    this.indicatorByUserService.getUserHealthIndicators(userId).subscribe(
      response => {
        this.indicatorsByPatient = response;
        this.generateHealthReport(response);
        this.countColors(response);
        this.countSpecificColors(response);
        this.data.datasets[0].data = [
          this.safeValue(response.peso?.promedio),
          this.safeValue(response.imc?.promedio),
          this.safeValue(response.radio_abdominal?.promedio),
          this.safeValue(response.porcentaje_musculo?.promedio),
          this.safeValue(response.grasa_corporal?.promedio),
          this.safeValue(response.grasa_visceral?.promedio),
          this.safeValue(response.colesterol_total?.promedio),
          this.safeValue(response.colesterol_hdl?.promedio),
          this.safeValue(response.colesterol_ldl?.promedio),
          this.safeValue(response.trigliceridos?.promedio),
          this.safeValue(response.glucosa?.promedio),
          this.safeValue(response.presion_sistolica?.promedio),
          this.safeValue(response.presion_diastolica?.promedio),
          this.safeValue(response.frecuencia_cardiaca?.promedio),
          this.safeValue(response.frecuencia_respiratoria?.promedio),
          this.safeValue(response.saturacion_oxigeno?.promedio),
          this.safeValue(response.glicemia_basal?.promedio),
          this.safeValue(response.temperatura?.promedio)
        ];
        
    
        // Aquí se asignan los colores de acuerdo con la respuesta de la API.
        this.data.datasets[0].backgroundColor = [
          this.safeColor(response.peso?.data?.color),
          this.safeColor(response.imc?.data?.color),
          this.safeColor(response.radio_abdominal?.data?.color),
          this.safeColor(response.porcentaje_musculo?.data?.color),
          this.safeColor(response.grasa_corporal?.data?.color),
          this.safeColor(response.grasa_visceral?.data?.color),
          this.safeColor(response.colesterol_total?.data?.color),
          this.safeColor(response.colesterol_hdl?.data?.color),
          this.safeColor(response.colesterol_ldl?.data?.color),
          this.safeColor(response.trigliceridos?.data?.color),
          this.safeColor(response.glucosa?.data?.color),
          this.safeColor(response.presion_sistolica?.data?.color),
          this.safeColor(response.presion_diastolica?.data?.color),
          this.safeColor(response.frecuencia_cardiaca?.data?.color),
          this.safeColor(response.frecuencia_respiratoria?.data?.color),
          this.safeColor(response.saturacion_oxigeno?.data?.color),
          this.safeColor(response.glicemia_basal?.data?.color),
          this.safeColor(response.temperatura?.data?.color)
        ];
        
      
        this.updateChart();
      },
      error => {
        console.error("Error al obtener los indicadores de salud del usuario", error);
      }
    );
  }



  private generateHealthReport(userData: IndicatorsByPatient) {
    this.indicatorHealthReport = [
      `Peso: Actualmente su peso es de ${userData.peso?.promedio ?? 'N/A'} kg, lo cual está considerado como ${userData.peso?.data?.status ?? 'Sin dato'}.`,
      `IMC: Su índice de masa corporal (IMC) es ${userData.imc?.promedio ?? 'N/A'} kg/m², lo que indica que se encuentra en ${userData.imc?.data?.status ?? 'Sin dato'}.`,
      `Radio Abdominal: Su circunferencia abdominal es de ${userData.radio_abdominal?.promedio ?? 'N/A'} cm (${userData.radio_abdominal?.data?.status ?? 'Sin dato'}).`,
      `Porcentaje de Músculo: Usted tiene un ${userData.porcentaje_musculo?.promedio ?? 'N/A'}% de masa muscular (${userData.porcentaje_musculo?.data?.status ?? 'Sin dato'}).`,
      `Grasa Corporal: Su grasa corporal corresponde al ${userData.grasa_corporal?.promedio ?? 'N/A'}% (${userData.grasa_corporal?.data?.status ?? 'Sin dato'}).`,
      `Grasa Visceral: Su nivel de grasa visceral es ${userData.grasa_visceral?.promedio ?? 'N/A'} (${userData.grasa_visceral?.data?.status ?? 'Sin dato'}).`,
      `Colesterol Total: Tiene un colesterol total de ${userData.colesterol_total?.promedio ?? 'N/A'} mg/dl (${userData.colesterol_total?.data?.status ?? 'Sin dato'}).`,
      `Colesterol HDL: Su nivel de HDL es ${userData.colesterol_hdl?.promedio ?? 'N/A'} mg/dl (${userData.colesterol_hdl?.data?.status ?? 'Sin dato'}).`,
      `Colesterol LDL: Su nivel de LDL es ${userData.colesterol_ldl?.promedio ?? 'N/A'} mg/dl (${userData.colesterol_ldl?.data?.status ?? 'Sin dato'}).`,
      `Triglicéridos: Tiene ${userData.trigliceridos?.promedio ?? 'N/A'} mg/dl de triglicéridos (${userData.trigliceridos?.data?.status ?? 'Sin dato'}).`,
      `Glucosa: Sus niveles de glucosa son ${userData.glucosa?.promedio ?? 'N/A'} mg/dl (${userData.glucosa?.data?.status ?? 'Sin dato'}).`,
      `Presión Sistólica: Su presión sistólica es de ${userData.presion_sistolica?.promedio ?? 'N/A'} mmHg (${userData.presion_sistolica?.data?.status ?? 'Sin dato'}).`,
      `Presión Diastólica: Su presión diastólica es de ${userData.presion_diastolica?.promedio ?? 'N/A'} mmHg (${userData.presion_diastolica?.data?.status ?? 'Sin dato'}).`,
      `Frecuencia Cardíaca: Su frecuencia cardiaca es de ${userData.frecuencia_cardiaca?.promedio ?? 'N/A'} latidos por minuto (${userData.frecuencia_cardiaca?.data?.status ?? 'Sin dato'}).`,
      `Frecuencia Respiratoria: Tiene una frecuencia respiratoria de ${userData.frecuencia_respiratoria?.promedio ?? 'N/A'} respiraciones por minuto (${userData.frecuencia_respiratoria?.data?.status ?? 'Sin dato'}).`,
      `Saturación de Oxígeno: Su saturación es de ${userData.saturacion_oxigeno?.promedio ?? 'N/A'}% (${userData.saturacion_oxigeno?.data?.status ?? 'Sin dato'}).`,
      `Glicemia Basal: Tiene ${userData.glicemia_basal?.promedio ?? 'N/A'} mg/dl de glicemia basal (${userData.glicemia_basal?.data?.status ?? 'Sin dato'}).`,
      `Temperatura: Su temperatura corporal es de ${userData.temperatura?.promedio ?? 'N/A'} °C (${userData.temperatura?.data?.status ?? 'Sin dato'}).`
    ];
  }
  

  // Función para contar los colores
  private countColors(resp: IndicatorsByPatient) {
  // Usa SIEMPRE colores CRUDOS desde la respuesta (no safeColor)
  const raw = [
    resp.peso?.data?.color,
    resp.imc?.data?.color,
    resp.radio_abdominal?.data?.color,
    resp.porcentaje_musculo?.data?.color,
    resp.grasa_corporal?.data?.color,
    resp.grasa_visceral?.data?.color,
    resp.colesterol_total?.data?.color,
    resp.colesterol_hdl?.data?.color,
    resp.colesterol_ldl?.data?.color,
    resp.trigliceridos?.data?.color,
    resp.glucosa?.data?.color,
    resp.presion_sistolica?.data?.color,
    resp.presion_diastolica?.data?.color,
    resp.frecuencia_cardiaca?.data?.color,
    resp.frecuencia_respiratoria?.data?.color,
    resp.saturacion_oxigeno?.data?.color,
    resp.glicemia_basal?.data?.color,
    resp.temperatura?.data?.color,
  ];

  this.colorSummary = { darkRed: 0, lightGreen: 0, green: 0, yellow: 0, orange: 0, red: 0 };

  for (const c of raw) {
    const k = this.getCategory(c);
    if (k !== 'none') (this.colorSummary as any)[k] += 1;
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
    

    getCardTitle(index: number): string {
      const titles = [
        'Peso', 
        // 'Altura', 
        'IMC', 
        'Radio abdominal', 
        'Porcentaje de músculo', 
        'Grasa corporal', 
        'Grasa visceral', 
        'Colesterol total', 
        'Colesterol HDL', 
        'Colesterol LDL', 
        'Triglicéridos', 
        'Glucosa', 
        'Presión sistólica', 
        'Presión diastólica', 
        'Frecuencia cardíaca', 
        'Frecuencia respiratoria', 
        'Saturación de oxígeno', 
        'Glicemia basal', 
        'Temperatura'
    ];
    
      return titles[index];
    }

    private countSpecificColors(response: IndicatorsByPatient) {
      const specificIndicators = [
        response.imc.data.color,
        response.radio_abdominal.data.color,
        response.grasa_visceral.data.color,
      ];
        // [#FFD700: Amarillo,  #FFA500: Naranja, #FF4C4C: Rojo , #FF0000: Rojo Oscuro, #00FF00: Verde, #32CD32: Verde Claro];
      const targetColors = ['#FFD700', '#FFA500', '#FF4C4C', '#FF0000']; // Colores: Amarillo, Naranja, Rojo, Rojo Oscuro
    
      // Reiniciar el contador cada vez que se ejecute la función
      this.specificColorCount = 0;
    
      specificIndicators.forEach((color, index) => {
        console.log(`Color del indicador ${index + 1}: ${color}`);  // Log de depuración
        if (targetColors.includes(color)) {
          this.specificColorCount += 1;
        }
      });
    
      console.log("Contador de colores específicos:", this.specificColorCount);  // Mostrar resultado final
    }
    
safeValue(value: number | null | undefined): number {
  return value ?? 0;
}

// Si el color es null o undefined, usa un gris para "sin dato"
private safeColor(color: string | null | undefined): string {
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

private getCategory(color?: string | null): ColorCat {
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
