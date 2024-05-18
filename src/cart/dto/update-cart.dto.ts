import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';


export class UpdateCartDto extends PartialType(CreateCartDto) {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    itemId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
    
}