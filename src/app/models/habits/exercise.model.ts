export interface ExerciseUnique {
    tipo: string[];          // Lista de tipos únicos de ejercicio (e.g., caminata, carrera)
    tiempo: number[];        // Lista de tiempos únicos en minutos de ejercicio
    fecha_minima : Date   
    fecha_maxima   : Date   
  }


  export interface ClasificationExerciseUsers {
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
  
  export interface ClasificationExercise {
    total_usuarios: number;                     // Número total de usuarios
    usuarios: ClasificationExerciseUsers[];  // Lista de usuarios que cumplen con los filtros
  }
  