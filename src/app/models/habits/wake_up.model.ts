export interface WakeUpUnique {
    horas: string[];              // Lista de horas únicas de despertar
    estados: number[];            // Lista de estados únicos de despertar
    fecha_minima : Date   
    fecha_maxima   : Date   
  }
  
  export interface ClasificationWakeUpUsers {
    nombres_apellidos: string;
    sexo: string;
    edad: number;
    estado_civil: string;
    fecha_nacimiento: string;
    telefono: string;
    grado_instruccion: string;
    procedencia: string;
    religion: string;
    correo: string;
  }
  
  export interface ClasificationWakeUp {
    total_usuarios: number;                   // Número total de usuarios
    usuarios: ClasificationWakeUpUsers[]; // Lista de usuarios que cumplen con los filtros
  }
  