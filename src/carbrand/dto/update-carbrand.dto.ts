import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCarbrandDto } from './create-carbrand.dto';
import { IsString } from 'class-validator';

export class UpdateCarbrandDto extends PartialType(CreateCarbrandDto) {
    @ApiProperty()
    @IsString()
    name: string;
}
