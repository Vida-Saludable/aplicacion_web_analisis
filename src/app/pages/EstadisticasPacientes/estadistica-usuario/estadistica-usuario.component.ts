import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicatorsByPatient } from 'src/app/models/indicatorByUser.model';

import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-estadistica-usuario',
  templateUrl: './estadistica-usuario.component.html',
  styleUrls: ['./estadistica-usuario.component.scss']
})
export class EstadisticaUsuarioComponent implements OnInit {
  private indicatorByUserService = inject(StatisticsService);
  private activateRoute = inject(ActivatedRoute);
  indicatorsByPatient: IndicatorsByPatient;
   indicatorHealthReport: string[] = [];

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
  }

  private initializeChart() {
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

  getIndicatorByUser(userId: number) {
    this.indicatorByUserService.getUserHealthIndicators(userId).subscribe(
      response => {
        this.indicatorsByPatient = response;
        this.generateHealthReport(response);
        this.countColors(response);
        this.data.datasets[0].data = [
          response.peso.promedio, response.altura.promedio, response.imc.promedio,
          response.presion_sistolica.promedio, response.presion_diastolica.promedio,
          response.radio_abdominal.promedio, response.grasa_corporal.promedio,
          response.grasa_visceral.promedio, response.frecuencia_cardiaca.promedio,
          response.frecuencia_respiratoria.promedio, response.colesterol_total.promedio,
          response.colesterol_hdl.promedio, response.colesterol_ldl.promedio,
          response.trigliceridos.promedio, response.glucosa.promedio,
          response.temperatura.promedio, response.saturacion_oxigeno.promedio,
          response.porcentaje_musculo.promedio, response.glicemia_basal.promedio,
          response.frecuencia_cardiaca_en_reposo.promedio,
          response.frecuencia_cardiaca_despues_de_45_segundos.promedio,
          response.frecuencia_cardiaca_1_minuto_despues.promedio,
          response.resultado_test_ruffier.promedio
        ];
    
        // Aquí se asignan los colores de acuerdo con la respuesta de la API.
        this.data.datasets[0].backgroundColor = [
          response.peso.data.color, response.altura.data.color, response.imc.data.color,
          response.presion_sistolica.data.color, response.presion_diastolica.data.color,
          response.radio_abdominal.data.color, response.grasa_corporal.data.color,
          response.grasa_visceral.data.color, response.frecuencia_cardiaca.data.color,
          response.frecuencia_respiratoria.data.color, response.colesterol_total.data.color,
          response.colesterol_hdl.data.color, response.colesterol_ldl.data.color,
          response.trigliceridos.data.color, response.glucosa.data.color,
          response.temperatura.data.color, response.saturacion_oxigeno.data.color,
          response.porcentaje_musculo.data.color, response.glicemia_basal.data.color,
          response.frecuencia_cardiaca_en_reposo.data.color,
          response.frecuencia_cardiaca_despues_de_45_segundos.data.color,
          response.frecuencia_cardiaca_1_minuto_despues.data.color,
          response.resultado_test_ruffier.data.color
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
      `Altura: ${response.altura.promedio} cm (${response.altura.data.status}).`,
      `IMC: ${response.imc.promedio} (${response.imc.data.status}).`,
      `Presión Sistólica: ${response.presion_sistolica.promedio} mmHg (${response.presion_sistolica.data.status}).`,
      `Presión Diastólica: ${response.presion_diastolica.promedio} mmHg (${response.presion_diastolica.data.status}).`,
      `Radio Abdominal: ${response.radio_abdominal.promedio} cm (${response.radio_abdominal.data.status}).`,
      `Grasa Corporal: ${response.grasa_corporal.promedio}% (${response.grasa_corporal.data.status}).`,
      `Grasa Visceral: ${response.grasa_visceral.promedio} (${response.grasa_visceral.data.status}).`,
      `Frecuencia Cardiaca: ${response.frecuencia_cardiaca.promedio} bpm (${response.frecuencia_cardiaca.data.status}).`,
      `Frecuencia Respiratoria: ${response.frecuencia_respiratoria.promedio} (${response.frecuencia_respiratoria.data.status}).`,
      `Colesterol Total: ${response.colesterol_total.promedio} mg/dl (${response.colesterol_total.data.status}).`,
      `Colesterol HDL: ${response.colesterol_hdl.promedio} mg/dl (${response.colesterol_hdl.data.status}).`,
      `Colesterol LDL: ${response.colesterol_ldl.promedio} mg/dl (${response.colesterol_ldl.data.status}).`,
      `Triglicéridos: ${response.trigliceridos.promedio} mg/dl (${response.trigliceridos.data.status}).`,
      `Glucosa: ${response.glucosa.promedio} mg/dl (${response.glucosa.data.status}).`,
      `Temperatura: ${response.temperatura.promedio} °C (${response.temperatura.data.status}).`,
      `Saturación Oxígeno: ${response.saturacion_oxigeno.promedio}% (${response.saturacion_oxigeno.data.status}).`,
      `Porcentaje Músculo: ${response.porcentaje_musculo.promedio}% (${response.porcentaje_musculo.data.status}).`,
      `Glicemia Basal: ${response.glicemia_basal.promedio} mg/dl (${response.glicemia_basal.data.status}).`,
      `Frecuencia Cardiaca en Reposo: ${response.frecuencia_cardiaca_en_reposo.promedio} bpm (${response.frecuencia_cardiaca_en_reposo.data.status}).`,
      `Frecuencia Cardiaca después de 45 Segundos: ${response.frecuencia_cardiaca_despues_de_45_segundos.promedio} bpm (${response.frecuencia_cardiaca_despues_de_45_segundos.data.status}).`,
      `Frecuencia Cardiaca 1 Minuto después: ${response.frecuencia_cardiaca_1_minuto_despues.promedio} bpm (${response.frecuencia_cardiaca_1_minuto_despues.data.status}).`,
      `Resultado del Test de Rufier: ${response.resultado_test_ruffier.promedio} (${response.resultado_test_ruffier.data.status}).`
    ];
  }

  // Función para contar los colores
  private countColors(response: IndicatorsByPatient) {
    const allColors = [
      response.peso.data.color, response.altura.data.color, response.imc.data.color,
      response.presion_sistolica.data.color, response.presion_diastolica.data.color,
      response.radio_abdominal.data.color, response.grasa_corporal.data.color,
      response.grasa_visceral.data.color, response.frecuencia_cardiaca.data.color,
      response.frecuencia_respiratoria.data.color, response.colesterol_total.data.color,
      response.colesterol_hdl.data.color, response.colesterol_ldl.data.color,
      response.trigliceridos.data.color, response.glucosa.data.color,
      response.temperatura.data.color, response.saturacion_oxigeno.data.color,
      response.porcentaje_musculo.data.color, response.glicemia_basal.data.color,
      response.frecuencia_cardiaca_en_reposo.data.color,
      response.frecuencia_cardiaca_despues_de_45_segundos.data.color,
      response.frecuencia_cardiaca_1_minuto_despues.data.color,
      response.resultado_test_ruffier.data.color
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
