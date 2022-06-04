import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do dono da conta',
    example: 'Jefferson Silva',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email do dono da conta',
    example: 'jeff@email.com',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'Senha do usuário para login',
    example: 'Abcd@1234',
  })
  password: string;

  @ApiProperty({
    description: 'A confirmação da senha deve ser igual a senha',
    example: 'Abcd@1234',
  })
  passwordConfirm: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'CPF do Usuario',
    example: '000.000.000-00',
  })
  cpf: string;
}
