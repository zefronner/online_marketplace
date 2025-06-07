import { IsNotEmpty, IsEmail, IsString } from "class-validator";


export class ConfirmSiginInUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    otp: string;
}