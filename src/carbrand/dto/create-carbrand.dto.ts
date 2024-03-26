import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCarbrandDto {
    @ApiProperty()
    @IsString()
    name: string = 'Car Brand Name';
}
