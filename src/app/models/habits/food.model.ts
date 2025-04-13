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
  

