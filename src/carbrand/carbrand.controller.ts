import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards
} from '@nestjs/common';
import { CarbrandService } from './carbrand.service';
import { CreateCarbrandDto } from './dto/create-carbrand.dto';
import { UpdateCarbrandDto } from './dto/update-carbrand.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CarbrandEntity } from './entities/carbrand.entity';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';


@ApiTags('carBrand')
@Controller('carbrand')
export class CarbrandController {
  constructor(private readonly carbrandService: CarbrandService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCarbrandDto): Promise<CarbrandEntity> {
    return this.carbrandService.update(+id, dto);
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.carbrandService.delete(+id);
  }
}
