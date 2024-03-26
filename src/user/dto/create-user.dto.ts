import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ default: 'Ваше Имя' })
    username: string;

    @ApiProperty({ default: 'example@ya.ru' })
    email: string;

    @ApiProperty({ default: '12345678' })
    password: string;
}
