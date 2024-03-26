import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async register(registerDto) {
    const user = await this.authService.register(registerDto);
    return user;
  }
  async login(loginDto) {
    const user = await this.authService.login(loginDto);
    return user;
  }
}