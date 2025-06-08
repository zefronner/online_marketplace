import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';


import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsDate } from 'class-validator';
import { IsOptional, IsEnum, IsNumber, IsDateString } from 'class-validator';

export class UpdatePaymentDto {
  @IsOptional()
  @IsEnum(['pending', 'paid', 'failed'])
  paymentStatus?: 'pending' | 'paid' | 'failed';

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsEnum(['pending', 'paid', 'failed'])
  paymentStatus?: string;
}
