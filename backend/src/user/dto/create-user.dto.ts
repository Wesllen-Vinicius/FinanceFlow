import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsEmail({}, { message: 'O e-mail deve ser válido' })
  email: string;

  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;
}
