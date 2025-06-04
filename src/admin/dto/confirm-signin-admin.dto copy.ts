import { IsNotEmpty, IsEmail, IsString } from "class-validator";


export class ConfirmSiginInAdminDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    otp: string;
}