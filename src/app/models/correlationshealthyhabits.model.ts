export interface CorrelationHealthyHabits {
    variable_x: string;
    variable_y: string;
    tipo:       string;
    resultados: Resultados;
}

export interface Resultados {
    Pearson:  CorrelationResult;
    Spearman: CorrelationResult;
    Kendall:  CorrelationResult;
}

export interface CorrelationResult {
    correlacion:    number;
    valor_p:        number;
    interpretacion: string;
}
