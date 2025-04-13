export interface IndicatorsByPatient {
  peso: Indicator;
  altura: Indicator;
  imc: Indicator;
  radio_abdominal: Indicator;
  porcentaje_musculo: Indicator;
  grasa_corporal: Indicator;
  grasa_visceral: Indicator;
  colesterol_total: Indicator;
  colesterol_hdl: Indicator;
  colesterol_ldl: Indicator;
  trigliceridos: Indicator;
  glucosa: Indicator;
  presion_sistolica: Indicator;
  presion_diastolica: Indicator;
  frecuencia_cardiaca: Indicator;
  frecuencia_respiratoria: Indicator;
  saturacion_oxigeno: Indicator;
  glicemia_basal: Indicator;
  temperatura: Indicator;

}

export interface Indicator {
  promedio: number;
  data: Data;
}

export interface Data {
  status: string;
  color: Color;
}

export enum Color {
  Ff4C4C = "#FF4C4C",
  Ffa500 = "#FFA500",
  Ffd700 = "#FFD700",
  The00Ff00 = "#00FF00",
  The32Cd32 = "#32CD32",
  FF0000='#FF0000'
}
