import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

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

  @ApiProperty()
  @IsString()
  title: string = 'Promo Name';

  @ApiProperty()
  @IsString()
  text: string = 'Promo Description';

  @ApiProperty()
  @IsNumber()
  rating: number = 5;

  @ApiProperty()
  @IsNumber()
  price: number = 3000;

}
