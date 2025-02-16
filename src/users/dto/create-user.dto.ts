import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail({}, { message: 'E-mail Inválido' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres' })
    password: string;

    @IsString()
    name: string;
}
