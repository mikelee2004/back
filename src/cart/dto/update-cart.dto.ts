import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class UpdateCartDto extends PartialType(CreateCartDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumberString()
    itemId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumberString()
    userId: number;
}
