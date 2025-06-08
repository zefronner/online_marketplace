import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, Matches } from 'class-validator';

export class CreateDeliveryDto {
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @IsString()
  @IsNotEmpty()
  place: string;

  @IsString()
  @IsPhoneNumber()
  phoneNumber: string;
  
  @IsString()
  mapUrl:string;
}
