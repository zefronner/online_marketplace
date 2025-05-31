import { IsNotEmpty, IsEmail, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";


export class CreateAdminDto {
    @IsString()
    @IsNotEmpty()
    usename: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @IsPhoneNumber('UZ')
    @IsNotEmpty()
    phone_number: string;
}