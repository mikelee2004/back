import { ApiProperty } from "@nestjs/swagger";
import { CreateCategoryDto } from "./create-category.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
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
  name: string;
}
