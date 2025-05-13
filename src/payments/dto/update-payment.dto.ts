import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {

  @IsOptional()
  @IsString()
  transbankToken?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsInt()
  amount?: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  paidAt?: Date;

}
