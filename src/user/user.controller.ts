import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./user.service";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { UserId } from "../decorators/user-id.decorator";

@Controller("users")
@ApiTags("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("My Profile")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getProfile(@UserId() id: number) {
    return this.usersService.findById(id);
  }
}
