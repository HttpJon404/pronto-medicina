import { IsNotEmpty, IsNumber, IsDateString, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty({ message: 'patient_id es requerido' })
  @IsNumber()
  patient_id: number;

  @IsNotEmpty({ message: 'doctor_id es requerido' })
  @IsNumber()
  doctor_id: number;

  @IsNotEmpty({ message: 'el monto($) de la cita es requerido' })
  @IsNumber()
  amount: number;

  @IsDateString({}, { message: 'appointment_date debe tener formato de fecha ISO válido' })
  @IsNotEmpty({ message: 'appointment_date es requerido' })
  appointment_date: string;

  @IsString()
  @IsNotEmpty()
  reason: string;
}
  