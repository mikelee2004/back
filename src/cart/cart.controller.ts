import { Controller, Get, Post, Body, UseGuards, Req, Patch} from '@nestjs/common';

import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UpdateCartDto } from './dto/update-cart.dto';

@ApiTags('cart')
@Controller('cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateCartDto, @Req() req: any) {
  console.log("**", req.id);
    return this.cartService.create(dto, req.id);
  }


  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get()
  get(@Req() req: any) {
    console.log(req);
    return this.cartService.getItemsInCart(req.id);
  }


  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Patch()
  patch(@Body() dto: UpdateCartDto, @Req() req: any) {
    return this.cartService.update(dto, req.id);
  }
}
