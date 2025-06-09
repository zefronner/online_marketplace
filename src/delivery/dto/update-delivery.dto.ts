import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryDto } from './create-delivery.dto';

import { IsOptional, IsNumber, IsString, Matches } from 'class-validator';

export class UpdateDeliveryDto {
  @IsNumber()
  @IsOptional()
  orderId?: number;

  @IsString()
  @IsOptional()
  place?: string;

  @IsString()
  @Matches(/^\+?\d{9,15}$/, { message: 'Invalid phone number format' })
  @IsOptional()
  phoneNumber?: string;
}
