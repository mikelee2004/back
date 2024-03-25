import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarbrandService } from './carbrand.service';
import { CreateCarbrandDto } from './dto/create-carbrand.dto';
import { UpdateCarbrandDto } from './dto/update-carbrand.dto';

@Controller('carbrand')
export class CarbrandController {
  constructor(private readonly carbrandService: CarbrandService) {}

  @Post()
  create(@Body() createCarbrandDto: CreateCarbrandDto) {
    return this.carbrandService.create(createCarbrandDto);
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
  update(@Param('id') id: string, @Body() updateCarbrandDto: UpdateCarbrandDto) {
    return this.carbrandService.update(+id, updateCarbrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carbrandService.remove(+id);
  }
}
