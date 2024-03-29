import { PartialType } from '@nestjs/mapped-types';
import { CreatePromoDto } from './create-promo.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePromoDto extends PartialType(CreatePromoDto) {
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
    title: string;

    @ApiProperty()
    @IsString()
    text: string;

}
