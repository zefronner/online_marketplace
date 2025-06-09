import { IsNotEmpty, isNumber, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
    @IsNumber()
    @IsNotEmpty()
    UserId: number

    @IsNumber()
    @IsNotEmpty()
    ProductId: number

    @IsNumber()
    @IsNotEmpty()
    Rating: number

    @IsString()
    @IsNotEmpty()
    comment: string
}

