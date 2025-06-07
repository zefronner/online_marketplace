import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateReviewDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @IsString()
    @IsNotEmpty()
    comment: string;

    @IsNumber()
    @IsNotEmpty()
    rating: number;
}
