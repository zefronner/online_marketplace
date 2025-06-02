import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';

// export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}

import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsDate } from 'class-validator';

export class UpdatePaymentDto {
  @IsOptional()
  @IsNumber()
  orderId?: number;

  @IsOptional()
  @IsEnum(['card', 'paypal', 'cash'])
  paymentMethod?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsEnum(['pending', 'paid', 'failed'])
  paymentStatus?: string;

  @IsOptional()
  @IsDate()
  paidAt?: Date;
}
