import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class CreateCartDto {
    @ApiProperty()
    @IsNotEmpty()
    productId: number;

    @ApiProperty()
    @IsNotEmpty()
    quantity: number;
}
