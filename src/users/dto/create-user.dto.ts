import { IsNotEmpty, IsString, IsEmail, IsEnum, IsStrongPassword } from "class-validator";
import { UserRoles } from "src/enum";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @IsEnum(UserRoles)
    @IsNotEmpty()
    role: UserRoles;
}
