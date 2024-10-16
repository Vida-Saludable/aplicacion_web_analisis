export interface WaterUnique {
    horas: string[];               // Lista de horas únicas donde se registró el consumo de agua
    cantidades: number[]; 
    fecha_minima : Date   
    fecha_maxima   : Date    
  }
  

  export interface ClasificationWaterUsers {
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
  
  export interface ClasificationWater {
    total_usuarios: number;                  // Número total de usuarios
    usuarios: ClasificationWaterUsers[];    // Lista de usuarios que cumplen con los filtros
  }
  