import {  IsNumber, IsDateString, IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsDateString({}, { message: 'appointment_date debe tener formato de fecha ISO válido' })
  appointment_date?: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsBoolean()
  paid?:boolean

  @IsOptional()
  @IsBoolean()
  confirmed?:boolean
}
  