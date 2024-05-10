import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class CreateCartDto {
    @ApiProperty()
    itemId: number;

    @ApiProperty()
    quantity: number;
}
