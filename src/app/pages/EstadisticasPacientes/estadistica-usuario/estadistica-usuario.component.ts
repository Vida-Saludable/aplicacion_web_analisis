import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicatorsByPatient } from 'src/app/models/indicatorByUser.model';

import { StatisticsService } from 'src/app/services/statistics.service';
import { UserService, UsuarioPersonal } from 'src/app/services/user.service';

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
    this.getIndicatorByUser(this.userId);
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
      datasets: [
        {
          type: 'bar',
          label: 'Verde claro = Bueno', // Explanation of color scheme
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
          label: 'Rojo Oscuro = Muy Malo',
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

  getIndicatorByUser(userId: number) {
    this.indicatorByUserService.getUserHealthIndicators(userId).subscribe(
      response => {
        this.indicatorsByPatient = response;
        this.generateHealthReport(response);
        this.countColors(response);
        this.countSpecificColors(response);
        this.data.datasets[0].data = [
          response.peso.promedio,                // Peso
          // response.altura.promedio,              // Altura
          response.imc.promedio,                 // IMC
          response.radio_abdominal.promedio,     // Radio Abdominal
          response.porcentaje_musculo.promedio,  // Porcentaje de Músculo
          response.grasa_corporal.promedio,      // Grasa Corporal
          response.grasa_visceral.promedio,      // Grasa Visceral
          response.colesterol_total.promedio,    // Colesterol Total
          response.colesterol_hdl.promedio,      // Colesterol HDL
          response.colesterol_ldl.promedio,      // Colesterol LDL
          response.trigliceridos.promedio,       // Triglicéridos
          response.glucosa.promedio,             // Glucosa
          response.presion_sistolica.promedio,   // Presión Sistólica
          response.presion_diastolica.promedio,  // Presión Diastólica
          response.frecuencia_cardiaca.promedio, // Frecuencia Cardíaca
          response.frecuencia_respiratoria.promedio, // Frecuencia Respiratoria
          response.saturacion_oxigeno.promedio,  // Saturación de Oxígeno
          response.glicemia_basal.promedio,      // Glicemia Basal
          response.temperatura.promedio          // Temperatura
        ];
    
        // Aquí se asignan los colores de acuerdo con la respuesta de la API.
        this.data.datasets[0].backgroundColor = [
          response.peso.data.color,                // Peso
          // response.altura.data.color,              // Altura
          response.imc.data.color,                 // IMC
          response.radio_abdominal.data.color,     // Radio Abdominal
          response.porcentaje_musculo.data.color,  // Porcentaje de Músculo
          response.grasa_corporal.data.color,      // Grasa Corporal
          response.grasa_visceral.data.color,      // Grasa Visceral
          response.colesterol_total.data.color,    // Colesterol Total
          response.colesterol_hdl.data.color,      // Colesterol HDL
          response.colesterol_ldl.data.color,      // Colesterol LDL
          response.trigliceridos.data.color,       // Triglicéridos
          response.glucosa.data.color,             // Glucosa
          response.presion_sistolica.data.color,   // Presión Sistólica
          response.presion_diastolica.data.color,  // Presión Diastólica
          response.frecuencia_cardiaca.data.color, // Frecuencia Cardíaca
          response.frecuencia_respiratoria.data.color, // Frecuencia Respiratoria
          response.saturacion_oxigeno.data.color,  // Saturación de Oxígeno
          response.glicemia_basal.data.color,      // Glicemia Basal
          response.temperatura.data.color          // Temperatura
      ];
      
        this.updateChart();
      },
      error => {
        console.error("Error al obtener los indicadores de salud del usuario", error);
      }
    );
  }



  private generateHealthReport(response: IndicatorsByPatient) {
    this.indicatorHealthReport = [
      `Peso: ${response.peso.promedio} kg (${response.peso.data.status}).`,
      // `Altura: ${response.altura.promedio} cm (${response.altura.data.status}).`,
      `IMC: ${response.imc.promedio} kg/m² (${response.imc.data.status}).`,
      `Radio Abdominal: ${response.radio_abdominal.promedio} cm (${response.radio_abdominal.data.status}).`,
      `Porcentaje Músculo: ${response.porcentaje_musculo.promedio}% (${response.porcentaje_musculo.data.status}).`,
      `Grasa Corporal: ${response.grasa_corporal.promedio}% (${response.grasa_corporal.data.status}).`,
      `Grasa Visceral: ${response.grasa_visceral.promedio} (${response.grasa_visceral.data.status}).`,
      `Colesterol Total: ${response.colesterol_total.promedio} mg/dl (${response.colesterol_total.data.status}).`,
      `Colesterol HDL: ${response.colesterol_hdl.promedio} mg/dl (${response.colesterol_hdl.data.status}).`,
      `Colesterol LDL: ${response.colesterol_ldl.promedio} mg/dl (${response.colesterol_ldl.data.status}).`,
      `Triglicéridos: ${response.trigliceridos.promedio} mg/dl (${response.trigliceridos.data.status}).`,
      `Glucosa: ${response.glucosa.promedio} mg/dl (${response.glucosa.data.status}).`,
      `Presión Sistólica: ${response.presion_sistolica.promedio} mmHg (${response.presion_sistolica.data.status}).`,
      `Presión Diastólica: ${response.presion_diastolica.promedio} mmHg (${response.presion_diastolica.data.status}).`,
      `Frecuencia Cardíaca: ${response.frecuencia_cardiaca.promedio} bpm (${response.frecuencia_cardiaca.data.status}).`,
      `Frecuencia Respiratoria: ${response.frecuencia_respiratoria.promedio} (${response.frecuencia_respiratoria.data.status}).`,
      `Saturación Oxígeno: ${response.saturacion_oxigeno.promedio}% (${response.saturacion_oxigeno.data.status}).`,
      `Glicemia Basal: ${response.glicemia_basal.promedio} mg/dl (${response.glicemia_basal.data.status}).`,
      `Temperatura: ${response.temperatura.promedio} °C (${response.temperatura.data.status}).`
  ];
  
  }

  // Función para contar los colores
  private countColors(response: IndicatorsByPatient) {
    const allColors = [
      response.peso.data.color,
      // response.altura.data.color,
      response.imc.data.color,
      response.radio_abdominal.data.color,
      response.porcentaje_musculo.data.color,
      response.grasa_corporal.data.color,
      response.grasa_visceral.data.color,
      response.colesterol_total.data.color,
      response.colesterol_hdl.data.color,
      response.colesterol_ldl.data.color,
      response.trigliceridos.data.color,
      response.glucosa.data.color,
      response.presion_sistolica.data.color,
      response.presion_diastolica.data.color,
      response.frecuencia_cardiaca.data.color,
      response.frecuencia_respiratoria.data.color,
      response.saturacion_oxigeno.data.color,
      response.glicemia_basal.data.color,
      response.temperatura.data.color
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
          default:
            this.colorSummary.darkRed += 1;
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
    
  
  }
