import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsNumber,
} from "class-validator";
import { CategoryEntity } from "src/category/entities/category.entity";

export class CreateProductDto {
  @ApiProperty({
    type: "file",
    properties: {
      file: {
        type: "string",
        format: "binary",
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
  price: number;

  @ApiProperty()
  @IsString()
  categoryId: number;
}
