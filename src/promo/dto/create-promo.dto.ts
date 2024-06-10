import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePromoDto {
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
  title: string;

  @ApiProperty()
  @IsString()
  text: string;
}
