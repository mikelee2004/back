import {
  ForbiddenException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserEntity } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UsersService } from '../user/user.service';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserId } from 'src/decorators/user-id.decorator';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(dto: LoginUserDto): Promise<any> {
    const user = await this.usersService.findByEmail(dto.email);

    if (user && user.password === dto.password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(dto: CreateUserDto) {
    const isCreateUsers = this.configService.get('CREATE_USERS') === 'true';
    if (!isCreateUsers) {
      throw new BadRequestException('Запрещено создавать новых пользователей!');
    }

    try {
      const userData = await this.usersService.create(dto);

      return {
        token: this.jwtService.sign({ id: userData.id }),
      };
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  async login(dto: LoginUserDto) {
    const user = await this.validateUser(dto)
    const payload = {
      id: user.id,
      email: user.email,
      sub: {
        username: user.username,
      },
    };
    return {
      user,
      backendToken: {
        accessToken: await this.jwtService.signAsync( payload, {
          expiresIn: process.env.EXPIRES_IN,
          secret: process.env.JWT_SECRET,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.JWT_REFRESH_TOKEN_KEY,
        }),
      },
    };
  }
}