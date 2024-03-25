import { Injectable } from '@nestjs/common';
import { CreateCarbrandDto } from './dto/create-carbrand.dto';
import { UpdateCarbrandDto } from './dto/update-carbrand.dto';

@Injectable()
export class CarbrandService {
  create(createCarbrandDto: CreateCarbrandDto) {
    return 'This action adds a new carbrand';
  }

  findAll() {
    return `This action returns all carbrand`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carbrand`;
  }

  update(id: number, updateCarbrandDto: UpdateCarbrandDto) {
    return `This action updates a #${id} carbrand`;
  }

  remove(id: number) {
    return `This action removes a #${id} carbrand`;
  }
}
