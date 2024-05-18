import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCartDto {
    @ApiProperty()
    @IsNotEmpty()
    itemId: number;

    @ApiProperty()
    @IsNotEmpty()
    quantity: number;

}
