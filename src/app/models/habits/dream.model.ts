export interface DreamUnique {
    hora_dormir: string[];       // Lista de horas únicas de dormir
    hora_despertar: string[];    // Lista de horas únicas de despertar
  }


  export interface ClasificationDreamUsers {
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
    tiempo_suenio: number | null; // Tiempo total de sueño calculado (en horas) o null si no hay datos
  }
  
  export interface ClasificationDream {
    total_usuarios: number;                    // Número total de usuarios
    usuarios: ClasificationDreamUsers[];    // Lista de usuarios que cumplen con los filtros
  }
  