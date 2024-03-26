import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCarbrandDto } from './dto/create-carbrand.dto';
import { UpdateCarbrandDto } from './dto/update-carbrand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CarbrandEntity } from './entities/carbrand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarbrandService {

  constructor(
    @InjectRepository(CarbrandEntity)
    private readonly carbrandRepository: Repository<CarbrandEntity>,
  ) {}
  async create(dto: CreateCarbrandDto): Promise<CarbrandEntity> {
    return this.carbrandRepository.save({name: dto.name});
  }

  async findAll(): Promise<CarbrandEntity[]> {
    return this.carbrandRepository.find();
  }

  async findOne(id: number): Promise<CarbrandEntity> {
    return this.carbrandRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateCarbrandDto) {
    const toUpdate = await this.carbrandRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException('Нет записи с таким брендом!')
    }
    if (dto.name) {
      toUpdate.name = dto.name;
    }
    return this.carbrandRepository.save(toUpdate);
  }

  async delete(id: number) {
    return this.carbrandRepository.delete(id);
  }
}
