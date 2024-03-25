import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ default: 'example@test.ru' })
    @IsEmail()
    email: string;

    @ApiProperty({ default: '12345678' })
    @MinLength(8, { message: 'Password must be 8 symbols or more!' })
    password: string;
}
