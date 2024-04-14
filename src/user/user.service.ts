import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) 
    private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}
  
  async createUser(dto: CreateUserDto) {
    const userExists = await this.findOne(dto.email);
    
    if (userExists) {
      throw new BadRequestException(
        `Email уже зарегестрирован!`,
      );
    }

    const user = await this.userRepository.save({
      username: dto.username,
      email: dto.email,
      password: await argon2.hash(dto.password)
    });

    const token = this.jwtService.sign({ email: CreateUserDto })

    return { user, token }
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      }})
  }

  async findById(id: number) {
    return this.userRepository.findOneBy({ id })
  }
}
