import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { OrderStatus } from "src/enum";

export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    @IsEnum(OrderStatus, { message: 'status value is invalid' })
    status: OrderStatus;

    @IsNumber()
    @IsNotEmpty()
    totalPrice: number;

    @IsNumber()
    @IsNotEmpty()
    productId: number;
}