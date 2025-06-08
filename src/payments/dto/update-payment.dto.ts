import { IsOptional, IsEnum, IsNumber } from 'class-validator';

export class UpdatePaymentDto {
  @IsNumber()
  orderId: number;

  @IsOptional()
  @IsEnum(['pending', 'paid', 'failed'])
  paymentStatus?: 'pending' | 'paid' | 'failed';

  @IsOptional()
  @IsNumber()
  amount?: number;
}
