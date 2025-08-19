export interface Patient {
    id:               number;
    correo:           string;
    role_name:        string;
    datos_personales: DatosPersonales | null;
}

export interface DatosPersonales {
    id:                number;
    nombres_apellidos: string;
    sexo:              Sexo;
    edad:              number;
    telefono:          string;
    estado_civil:      string;
}

export enum Sexo {
    F = "F",
    M = "M",
}
