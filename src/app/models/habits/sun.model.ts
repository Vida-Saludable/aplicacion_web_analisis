export interface SunUnique{
    tiempo: number[];           // Lista de tiempos únicos en minutos de exposición al sol
    fecha: string[];            // Lista de fechas únicas de exposición al sol
    fecha_minima : Date   
    fecha_maxima   : Date   
  }

  export interface ClasificationSunUsers {
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
  
  export interface ClasificationSun {
    total_usuarios: number;                       // Número total de usuarios
    usuarios: ClasificationSunUsers[];          // Lista de usuarios que cumplen con los filtros
  }
  