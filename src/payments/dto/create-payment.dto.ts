import { IsEnum, isEnum, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePaymentDto {
  @IsNumber()
  orderId: number;

  @IsEnum(['card', 'paypal', 'cash'])
  paymentMethod: 'card' | 'paypal' | 'cash';

  @IsNumber()
  amount: number;

  @IsEnum(['pending', 'paid', 'failed'])
  paymentStatus: 'pending' | 'paid' | 'failed';

  @IsNotEmpty()
  paidAt: Date;
}
