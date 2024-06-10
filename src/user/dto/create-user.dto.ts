import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ default: "Введите ваш Email!" })
  @IsEmail()
  email: string;

  @ApiProperty({ default: "Введите ваш пароль:" })
  @IsString()
  @MinLength(8, { message: "Пароль должен быть не менее 8 символов!" })
  password: string;
}
