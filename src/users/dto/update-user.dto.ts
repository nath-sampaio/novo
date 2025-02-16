import { IsOptional, IsEmail, IsString, MinLength  } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'E-mail Inválido' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres' })
  password?: string;
}
