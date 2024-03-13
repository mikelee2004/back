import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePromoDto {
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  image: Express.Multer.File;

  @IsString()
  title: string = 'Promo Name';

  @IsString()
  text: string = 'Promo Description';
}
