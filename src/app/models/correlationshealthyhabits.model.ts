export interface CorrelationHealthyHabits {
    variable_x: string;
    variable_y: string;
    tipo:       string;
    resultados: Resultados;
    error?: string;
}

export interface Resultados {
    Pearson:  CorrelationResult;
    Spearman: CorrelationResult;
    Kendall:  CorrelationResult;
}

export interface CorrelationResult {
    correlacion:    number;
    nivel_de_confiabilidad:        number;
    interpretacion: string;
}
