import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class CreateCartDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumberString()
    itemId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

}
