generateHealthReport(userData: IndicatorByProject) {
    this.indicatorhealthReport = [
      `Peso: Actualmente su peso es de ${userData.peso.promedio} kg, lo cual está considerado como ${userData.peso.status}.`,
      `Altura: Su altura de ${userData.altura.promedio} m está ${userData.altura.status}.`,
      `IMC: Su índice de masa corporal (IMC) es ${userData.imc.promedio}, lo que indica que se encuentra en ${userData.imc.status}.`,
      `Presión Sistólica: Su presión sistólica es de ${userData.presion_sistolica.promedio} mmHg, y está considerada como ${userData.presion_sistolica.status}.`,
      `Presión Diastólica: Su presión diastólica es de ${userData.presion_diastolica.promedio} mmHg, lo cual está ${userData.presion_diastolica.status}.`,
      `Radio Abdominal: El radio abdominal es de ${userData.radio_abdominal.F.promedio} cm. Para hombres, este valor está ${userData.radio_abdominal.M.promedio} y para mujeres, está ${userData.radio_abdominal.F.promedio}.`,
      `Grasa Corporal: Tiene un promedio de grasa corporal del ${userData.grasa_corporal.M.promedio}%, lo cual está ${userData.grasa_corporal.M.status} para hombres y ${userData.grasa_corporal.F.status} para mujeres.`,
      `Grasa Visceral: Su grasa visceral está en ${userData.grasa_visceral.promedio}, lo cual se considera ${userData.grasa_visceral.status}.`,
      `Frecuencia Cardiaca: Su frecuencia cardiaca en reposo es de ${userData.frecuencia_cardiaca.promedio} latidos por minuto, lo que se considera ${userData.frecuencia_cardiaca.status}.`,
      `Frecuencia Respiratoria: Tiene una frecuencia respiratoria de ${userData.frecuencia_respiratoria.promedio} respiraciones por minuto, lo que es ${userData.frecuencia_respiratoria.status}.`,
      `Colesterol Total: El colesterol total es de ${userData.colesterol_total.promedio} mg/dl, lo que se considera ${userData.colesterol_total.status}.`,
      `Colesterol HDL: Sus niveles de colesterol HDL son de ${userData.colesterol_hdl.M.promedio} mg/dl, considerados como ${userData.colesterol_hdl.M.status} para hombres y ${userData.colesterol_hdl.F.status} para mujeres.`,
      `Colesterol LDL: El colesterol LDL está en ${userData.colesterol_ldl.promedio} mg/dl, clasificado como ${userData.colesterol_ldl.status}.`,
      `Triglicéridos: Tiene triglicéridos a un nivel de ${userData.trigliceridos.promedio} mg/dl, considerados ${userData.trigliceridos.status}.`,
      `Glucosa: Sus niveles de glucosa en sangre son de ${userData.glucosa.promedio} mg/dl, lo que se considera ${userData.glucosa.status}.`,
      `Frecuencia Cardiaca en Reposo: Su frecuencia cardiaca en reposo es de ${userData.frecuencia_cardiaca_en_reposo.promedio} latidos por minuto, lo que se considera ${userData.frecuencia_cardiaca_en_reposo.status}.`,
      `Frecuencia Cardiaca 45 Segundos: Su frecuencia cardiaca en 45 segundos es de ${userData.frecuencia_cardiaca_despues_de_45_segundos.promedio}, considerada ${userData.frecuencia_cardiaca_despues_de_45_segundos.status}.`,
      `Frecuencia Cardiaca 1 Minuto: Su frecuencia cardiaca al minuto es de ${userData.frecuencia_cardiaca_1_minuto_despues.promedio}, lo que está en ${userData.frecuencia_cardiaca_1_minuto_despues.status}.`,
      `Test de Rufier: El resultado del test de Rufier es ${userData.resultado_test_ruffier.promedio}, lo que significa que está en un estado de salud ${userData.resultado_test_ruffier.status}.`
    ];
  }