import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
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
  @IsString()
  name: string;
}
