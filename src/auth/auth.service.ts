import {
  ForbiddenException,
  Injectable,
  BadRequestException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserEntity } from "../user/entities/user.entity";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { UsersService } from "../user/user.service";
import { LoginUser } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(dto: CreateUserDto): Promise<any> {
    const user = await this.usersService.findByEmail(dto.email);

    if (user && user.password === dto.password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(dto: CreateUserDto) {
    const isCreateUsers = this.configService.get("CREATE_USERS") === "true";
    if (!isCreateUsers) {
      throw new BadRequestException("Запрещено создавать новых пользователей!");
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

  async login(dto: CreateUserDto): Promise<any> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new BadRequestException(`Такого юзера не существует`);
    }
    
    const validUser = await this.validateUser(user)

    if (!validUser) {
      throw new BadRequestException(`Неправильно логин или пароль`);
    }
    const payload = { email: user.email, role: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
