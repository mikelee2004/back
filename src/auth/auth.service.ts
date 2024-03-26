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

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === password) {
      const {
        password, ...result
      } = user;
      return result;
    }
    
    return null;
  }

  async register(dto: CreateUserDto) {
    const isCreateUser = this.configService.get('CREATE_USER') === 'true';
    if (!isCreateUser) {
      throw new BadRequestException('Вы не можете создать нового пользователя!');
    }

    try {
      const userData = await this.userService.create(dto);

      return {
        token: this.jwtService.sign({id: userData.id }),
      };
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  async login(user: UserEntity) {
    return {
      token: this.jwtService.sign({ id: user.id})
    }
  }
}
