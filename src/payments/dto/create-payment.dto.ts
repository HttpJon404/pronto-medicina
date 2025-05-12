export class CreatePaymentDto {
  appointmentId: number; // ID de la cita médica
  transbankToken: string; // Token de Transbank
  amount: number; // Monto del pago
}