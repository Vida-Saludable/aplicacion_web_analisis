export interface IndicatorByProject {
    peso:                                       Indicator;
    altura:                                     Indicator;
    imc:                                        Indicator;
    radio_abdominal:                            GenderProject;
    porcentaje_musculo:                         GenderProject;
    grasa_corporal:                             GenderProject;
    grasa_visceral:                             Indicator;
    colesterol_total:                           Indicator;
    colesterol_hdl:                             GenderProject;
    colesterol_ldl:                             Indicator;
    trigliceridos:                              Indicator;
    glucosa:                                    Indicator;
    presion_sistolica:                          Indicator;
    presion_diastolica:                         Indicator;
    frecuencia_cardiaca:                        Indicator;
    frecuencia_respiratoria:                    Indicator;
    saturacion_oxigeno:                         Indicator;
    glicemia_basal:                             Indicator;
    temperatura:                                Indicator;
    frecuencia_cardiaca_en_reposo:              Indicator;
    frecuencia_cardiaca_despues_de_45_segundos: Indicator;
    frecuencia_cardiaca_1_minuto_despues:       Indicator;
    resultado_test_ruffier:                     Indicator;
}

export interface Indicator {
    promedio: number;
    data:     Data;
}

export interface Data {
    status: string;
    color:  Color;
}

export enum Color {
    Ff4C4C = "#FF4C4C",
    Ffa500 = "#FFA500",
    Ffd700 = "#FFD700",
    The00Ff00 = "#00FF00",
    The32Cd32 = "#32CD32",
    FF0000='#FF0000'
}

export interface GenderProject {
    M: F;
    F: F;
}

export interface F {
    promedio: number;
    status:   Data;
}
