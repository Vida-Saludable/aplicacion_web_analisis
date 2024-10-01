export interface HabitsByDates {
    alimentacion:    HabitType;
    agua:            HabitType;
    esperanza:       HabitType;
    sol:             HabitType;
    aire:            HabitType;
    dormir:          HabitType;
    ejercicio:       HabitType;
    recomendaciones: Alertas;
    alertas:         Alertas;
}

export interface HabitType {
    tendencia:          string;
    promedio:           number;
    historial:          number[];
    comparacion_normas: string;
}

export interface Alertas {
    alimentacion: string[];
    agua:         string[];
    esperanza:    any[];
    sol:          string[];
    aire:         any[];
    dormir:       string[];
    ejercicio:    string[];
}
