export class HealthAnalyzer {

    // Método para asignar color basado en el estado de salud
    static getHealthStatusColor(status: string): string {
      switch (status) {
        case 'Muy bajo':
        case 'Malo':
        case 'Hipertensión etapa 2':
        case 'Obesidad':
          return '#FF4C4C'; // Rojo
  
        case 'Bajo':
        case 'Aceptable':
        case 'Elevada':
        case 'Hipertensión etapa 1':
          return '#FFD700'; // Amarillo
  
        case 'Normal':
        case 'Bueno':
        case 'Buena':
          return '#00FF00'; // Verde
  
        case 'Muy bueno':
        case 'Excelente':
          return '#32CD32'; // Verde Claro
  
        default:
          return '#D3D3D3'; // Gris para casos no definidos
      }
    }
}
