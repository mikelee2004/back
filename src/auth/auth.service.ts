import { 
  BadRequestException, 
  ForbiddenException, 
  Injectable 
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    const passwordMatch = await argon2.verify(user.password, password)
    if (user && passwordMatch) {
      return user;
    }
    throw new BadRequestException("Пароль или email введен неправильно!")
  }

  async register(dto: CreateUserDto) {
    const createUser = this.configService.get('CREATE_USER') === 'true';
    if (!createUser) {
      throw new BadRequestException('Вы не можете создать нового пользователя!');
    }

    try {
      const userData = await this.userService.createUser(dto);

      return {
        // token: this.jwtService.sign({id: userData.id }),
      };
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  async login(user: IUser) {
    const {id, email} = user
    return {
      id, email, token: this.jwtService.sign({ id: user.id, email: user.email})
    }
  }
}
