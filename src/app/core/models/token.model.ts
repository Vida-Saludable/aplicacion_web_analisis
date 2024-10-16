export interface TokenAccess {
    success: boolean;
    message: string;
    data:    Data;
}

export interface Data {
    id:      number;
    refresh: string;
    access:  string;
    nombre:  string;
    correo:  string;
    role:    string;
}
