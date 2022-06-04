import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email do usuário',
    example: 'jeff@email.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Abcd@1234',
  })
  password: string;
}
