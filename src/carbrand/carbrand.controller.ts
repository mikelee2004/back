import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete 
} from '@nestjs/common';
import { CarbrandService } from './carbrand.service';
import { CreateCarbrandDto } from './dto/create-carbrand.dto';
import { UpdateCarbrandDto } from './dto/update-carbrand.dto';
import { ApiTags } from '@nestjs/swagger';
import { CarbrandEntity } from './entities/carbrand.entity';
import { DeleteResult } from 'typeorm';


@ApiTags('carBrand')
@Controller('carbrand')
export class CarbrandController {
  constructor(private readonly carbrandService: CarbrandService) {}

  @Post()
  create(@Body() dto: CreateCarbrandDto): Promise<CarbrandEntity> {
    return this.carbrandService.create(dto);
  }

  @Get()
  findAll() {
    return this.carbrandService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carbrandService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCarbrandDto): Promise<CarbrandEntity> {
    return this.carbrandService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.carbrandService.delete(+id);
  }
}
