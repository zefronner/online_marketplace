

import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class CreateDeliveryDto {
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @IsString()
  @IsNotEmpty()
  place: string;

  @IsString()
  @Matches(/^\+?\d{9,15}$/, { message: 'Invalid phone number format' })
  phoneNumber: string;
}
