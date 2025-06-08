import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { UserRoles } from 'src/enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
