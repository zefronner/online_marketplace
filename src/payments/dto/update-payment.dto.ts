import { IsOptional, IsEnum, IsNumber, IsDateString } from 'class-validator';

export class UpdatePaymentDto {
  @IsOptional()
  @IsEnum(['pending', 'paid', 'failed'])
  paymentStatus?: 'pending' | 'paid' | 'failed';

  @IsOptional()
  @IsNumber()
  amount?: number;
}
