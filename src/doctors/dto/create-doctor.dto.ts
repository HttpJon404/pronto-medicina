// src/doctors/dto/create-doctor.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateDoctorDto {
  @IsNumber()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  rut: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  specialty: string;
}
