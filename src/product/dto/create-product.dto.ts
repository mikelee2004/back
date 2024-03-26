import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";
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
    name: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    amount: number = 50;

    @ApiProperty()
    price: number = 3000;

    @ApiProperty()
    @IsString()
    categoryId: number;

    @ApiProperty()
    @IsNumberString()
    brandId: number;


    // МАСЛА!!!!!!!!!!!!!!!
    @ApiProperty({ required: false})
    @IsString()
    @IsOptional()
    oilPackType: string;

    @ApiProperty({ required: false})
    @IsString()
    @IsOptional()
    oilCapacity: number;

    @ApiProperty({ required: false})
    @IsString()
    @IsOptional()
    oilPurpose: string;

    @ApiProperty({ required: false})
    @IsString()
    @IsOptional()
    oilViscosity: string;
}
