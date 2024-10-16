export interface HopeUnique {
    tipo_practica: string[];   // Lista de tipos de práctica de esperanza (oración, lectura de la Biblia)
    fecha: string[];           // Lista de fechas únicas de práctica de esperanza
    fecha_minima : Date   
    fecha_maxima   : Date   
  }
  
  export interface ClasificationHopeUsers {
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
  
  export interface ClasificationHope {
    total_usuarios: number;                        // Número total de usuarios
    usuarios: ClasificationHopeUsers[];     // Lista de usuarios que cumplen con los filtros
  }
  