import { Component } from '@angular/core';

@Component({
  selector: 'app-reglas-dinamica',

  templateUrl: './reglas-dinamica.component.html',
  styleUrl: './reglas-dinamica.component.scss'
})
export class ReglasDinamicaComponent {
 formatosBiometricos = [
  { nombre: 'Peso', unidad: 'kg', formato: '1 o 2 decimales', detalle: 'Ej. 77.66 kg' },
  { nombre: 'IMC', unidad: 'kg/m²', formato: '1 o 2 decimales', detalle: 'Calculado automáticamente' },
  { nombre: 'Radio Abdominal', unidad: 'cm', formato: '1 o 2 decimales', detalle: 'Diferenciado por sexo' },
  { nombre: 'Grasa Corporal', unidad: '%', formato: '1 o 2 decimales', detalle: 'Porcentaje del total corporal' },
  { nombre: 'Grasa Visceral', unidad: '%', formato: '1 o 2 decimales', detalle: 'Valor relativo, umbral aceptable < 13%' },
  { nombre: 'Porcentaje de Músculo', unidad: '%', formato: '1 o 2 decimales', detalle: 'Porcentaje del total corporal' },
  { nombre: 'Colesterol Total', unidad: 'mg/dl', formato: '1 o 2 decimales', detalle: 'Valor clínico de referencia' },
  { nombre: 'Colesterol HDL', unidad: 'mg/dl', formato: '1 o 2 decimales', detalle: 'Se diferencia entre hombres y mujeres' },
  { nombre: 'Colesterol LDL', unidad: 'mg/dl', formato: '1 o 2 decimales', detalle: 'Valor objetivo < 130 mg/dl' },
  { nombre: 'Triglicéridos', unidad: 'mg/dl', formato: '1 o 2 decimales', detalle: 'Valor aceptable < 150 mg/dl' },
  { nombre: 'Glucosa (Glicemia Basal)', unidad: 'mg/dl', formato: '1 o 2 decimales', detalle: 'En ayunas' },
  { nombre: 'Presión Sistólica', unidad: 'mmHg', formato: '1 o 2 decimales', detalle: 'Primera cifra de la PA' },
  { nombre: 'Presión Diastólica', unidad: 'mmHg', formato: '1 o 2 decimales', detalle: 'Segunda cifra de la PA' },
  { nombre: 'Frecuencia Cardíaca', unidad: 'lat/min', formato: '1 o 2 decimales', detalle: 'En reposo' },
  { nombre: 'Frecuencia Respiratoria', unidad: 'resp/min', formato: '1 o 2 decimales', detalle: 'En reposo' },
  { nombre: 'Temperatura Corporal', unidad: '°C', formato: '1 o 2 decimales', detalle: 'Tomada con termómetro digital' },
  { nombre: 'Saturación de Oxígeno', unidad: '%', formato: '1 o 2 decimales', detalle: 'Valor esperado > 95%' }
];


}
