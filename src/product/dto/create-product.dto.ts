import { IsDecimal, IsNotEmpty, IsNumber, IsString, Min, min } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name:string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsNumber()
    @IsNotEmpty()
    categoryId: number

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    inStock: number

}
