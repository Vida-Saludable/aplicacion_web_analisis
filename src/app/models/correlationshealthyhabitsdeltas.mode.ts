export interface CorrelationHealthyHabistDeltas {
    variable_x:              string;
    variable_y:              string;
    tipo_x:                  string;
    tipo_y:                  string;
    correlaciones_iniciales: CorrelacionesAles;
    correlaciones_finales:   CorrelacionesAles;
    cambios:                 Cambios;
}

export interface Cambios {
    pearson:  string;
    spearman: string;
    kendall:  string;
}

export interface CorrelacionesAles {
    pearson:  Kendall;
    spearman: Kendall;
    kendall:  Kendall;
}

export interface Kendall {
    correlation: number;
    p_value:     number;
}
