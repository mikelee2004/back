import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({
        type: 'file',
        properties: {
            file: {
                type: 'string',
                format: 'binary'
            },
        },
    })
    image: Express.Multer.File;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title = 'Масло'

    @ApiProperty()
    @IsString()
    text = 'Моторное масло'
}
