export interface IndicatorByProject {
    peso:                                       Altura;
    altura:                                     Altura;
    imc:                                        Altura;
    presion_sistolica:                          Altura;
    presion_diastolica:                         Altura;
    radio_abdominal:                            ColesterolHDL;
    grasa_corporal:                             ColesterolHDL;
    grasa_visceral:                             Altura;
    frecuencia_cardiaca:                        Altura;
    frecuencia_respiratoria:                    Altura;
    colesterol_total:                           Altura;
    colesterol_hdl:                             ColesterolHDL;
    colesterol_ldl:                             Altura;
    trigliceridos:                              Altura;
    glucosa:                                    Altura;
    temperatura:                                Altura;
    saturacion_oxigeno:                         Altura;
    porcentaje_musculo:                         ColesterolHDL;
    glicemia_basal:                             Altura;
    frecuencia_cardiaca_en_reposo:              Altura;
    frecuencia_cardiaca_despues_de_45_segundos: Altura;
    frecuencia_cardiaca_1_minuto_despues:       Altura;
    resultado_test_ruffier:                     Altura;
}

export interface Altura {
    promedio: number | null;
    status:   null | string;
}

export interface ColesterolHDL {
    M: Altura;
    F: Altura;
}
