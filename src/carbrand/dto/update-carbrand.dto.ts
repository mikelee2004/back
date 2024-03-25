import { PartialType } from '@nestjs/swagger';
import { CreateCarbrandDto } from './create-carbrand.dto';

export class UpdateCarbrandDto extends PartialType(CreateCarbrandDto) {}
