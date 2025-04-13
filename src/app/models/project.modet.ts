export interface Project {
    id:           number;
    nombre:       string;
    descripcion:  string;
    imageUrl: string;
    fecha_inicio: Date;
    fecha_fin:    Date;
    estado:       number;
    totalUsers?:  number; // Hacer opcional esta propiedad
}
