import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { UserEntity } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { LoginUserDto } from 'src/user/dto/login-user.dto';


@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('login')
  @ApiBody({ type: LoginUserDto })
  async login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
