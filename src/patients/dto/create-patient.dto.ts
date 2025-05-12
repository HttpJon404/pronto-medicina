import { IsEmail, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePatientDto {
  @IsNumber()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  rut: string;

  @IsString()
  @IsNotEmpty()
  names: string;

  @IsString()
  @IsNotEmpty()
  last_names: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
