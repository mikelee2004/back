import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) 
    private repository: Repository<UserEntity>,
  ) {}
  
  async create(dto: CreateUserDto) {
    const existingUser = await this.findByEmail(dto.email);
    
    if (existingUser) {
      throw new BadRequestException(
        `E-Mail ${dto.email} уже зарегестрирован!`,
      );
    }
    return this.repository.save(dto)
  }

  async findByEmail(email: string) {
    return this.repository.findOneBy({ email: email })
  }

  async findById(id: number) {
    return this.repository.findOneBy({ id })
  }
}
