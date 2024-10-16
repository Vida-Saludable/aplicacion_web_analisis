export interface AirUnique {
    tiempos: number[];               // Lista de tiempos únicos en minutos que los usuarios pasan al aire libre
    fecha_minima : Date   
    fecha_maxima   : Date   
  }
  export interface ClasificationAirUsers {
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
  
  export interface ClasificationAir {
    total_usuarios: number;                  // Número total de usuarios
    usuarios: ClasificationAirUsers[];    // Lista de usuarios que cumplen con los filtros
  }
  