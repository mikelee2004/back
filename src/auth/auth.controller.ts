import { Controller, Request, Post, UseGuards, Body, UnauthorizedException } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { UsersService } from "src/user/user.service";
import { LocalStrategy } from "./strategies/local.strategy";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private readonly localStrategy: LocalStrategy
  ) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto): Promise<any> {
    return await this.localStrategy.register(dto);
  }


  @Post('login')
  async login(@Body() dto: CreateUserDto): Promise<any> {
    const user = await this.localStrategy.login(dto);
    if (!user) {
      throw new UnauthorizedException('Неправильные учетные данные');
    }
    return user;
  }
}
