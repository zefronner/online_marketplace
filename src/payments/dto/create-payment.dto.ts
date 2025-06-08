import { IsEnum, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
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

}
