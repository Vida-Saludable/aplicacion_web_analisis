export interface FoodUnique {
    desayuno_hora: string[];          // Lista de horas de desayuno únicas
    almuerzo_hora: string[];          // Lista de horas de almuerzo únicas
    cena_hora: string[];              // Lista de horas de cena únicas
    desayuno: number[];               // Lista de valores de desayuno (0/1)
    almuerzo: number[];               // Lista de valores de almuerzo (0/1)
    cena: number[];                   // Lista de valores de cena (0/1)
    desayuno_saludable: number[];     // Lista de valores de desayuno saludable (0/1)
    almuerzo_saludable: number[];     // Lista de valores de almuerzo saludable (0/1)
    cena_saludable: number[];         // Lista de valores de cena saludable (0/1)
    fecha_minima : Date   
    fecha_maxima   : Date   
  }
  

  export interface ClasificationFoodUsers {
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
  
  export interface ClasificationFood {
    total_usuarios: number;                 // Número total de usuarios
    usuarios: ClasificationFoodUsers[];   // Lista de usuarios que cumplen con los filtros
  }
  