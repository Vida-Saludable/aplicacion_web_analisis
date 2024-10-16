export interface SleepUnique {
    hora: string[];       // Lista de horas únicas cuando los usuarios se duermen
    fecha_minima : Date   
    fecha_maxima   : Date   
  }


  export interface ClasificationSleepUsers {
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
  
  export interface ClasificationSleep {
    total_usuarios: number;                   // Número total de usuarios
    usuarios: ClasificationSleepUsers[];   // Lista de usuarios que cumplen con los filtros
  }
  