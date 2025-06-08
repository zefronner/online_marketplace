import { IsOptional, IsNumber } from 'class-validator';

export class UpdateCartDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  productId: number;

  @IsNumber()
  amount?: number;
}
