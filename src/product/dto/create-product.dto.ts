import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CategoryEntity } from "src/category/entities/category.entity";

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
    name = 'Название продукта'

    @ApiProperty()
    @IsString()
    description = 'Описание'

    @ApiProperty()
    amount: number = 50;

    @ApiProperty()
    price: number = 3000;

    @ApiProperty()
    @IsString()
    category: CategoryEntity;
}
