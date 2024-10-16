export interface HistoryHabitsByUser {
    habito: string;
    tendencia: string;
    promedio: number;
    comparacion_normas: string;
    recomendaciones: string[];
    alertas: string[];
    historial: Array<[string, number]>;  // Array de fechas y valores
}
