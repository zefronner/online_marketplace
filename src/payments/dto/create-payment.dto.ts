import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { IsEnum, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @IsNotEmpty()
  @IsEnum(['card', 'paypal', 'cash'])
  paymentMethod: 'card' | 'paypal' | 'cash';

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsEnum(['pending', 'paid', 'failed'])
  paymentStatus: 'pending' | 'paid' | 'failed';

  @IsNotEmpty()
  @IsDateString()
  paidAt: Date;
}
