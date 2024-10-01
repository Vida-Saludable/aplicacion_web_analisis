// health-indicator.model.ts
export interface HealthIndicator {
    promedio: number;
    status: string;
  }
  
  export interface HealthStatistics {
    peso: HealthIndicator;
    altura: HealthIndicator;
    imc: HealthIndicator;
    radio_abdominal: HealthIndicator;
    porcentaje_musculo: HealthIndicator;
    grasa_corporal: HealthIndicator;
    grasa_visceral: HealthIndicator;
    colesterol_total: HealthIndicator;
    colesterol_hdl: HealthIndicator;
    colesterol_ldl: HealthIndicator;
    trigliceridos: HealthIndicator;
    glucosa: HealthIndicator;
    presion_sistolica: HealthIndicator;
    presion_diastolica: HealthIndicator;
    frecuencia_cardiaca: HealthIndicator;
    frecuencia_respiratoria: HealthIndicator;
    saturacion_oxigeno: HealthIndicator;
    glicemia_basal: HealthIndicator;
    temperatura: HealthIndicator;
    frecuencia_cardiaca_en_reposo: HealthIndicator;
    frecuencia_cardiaca_despues_de_45_segundos: HealthIndicator;
    frecuencia_cardiaca_1_minuto_despues: HealthIndicator;
    resultado_test_ruffier: HealthIndicator;
  }
  