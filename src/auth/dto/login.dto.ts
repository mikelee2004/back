import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginUser {

  @ApiProperty({ default: "Введите ваш Email!" })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ default: "password" })
  @IsString()
  @MinLength(8, { message: "Пароль должен быть не менее 8 символов!" })
  password: string;
}