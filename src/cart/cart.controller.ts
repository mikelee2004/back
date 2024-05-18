import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateCartDto } from './dto/update-cart.dto';
import { DeleteResult } from 'typeorm';

@ApiTags('cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() dto: CreateCartDto, @Req() req: any) {
    console.log("**", req.id)
    return await this.cartService.create(dto, req.id);
  }

  @Get()
  get(@Request() req: any) {
    return this.cartService.getItemsInCart(req.id);
  }

  @Patch()
  async update(@Body() dto: UpdateCartDto, @Req() req: any) {
    return await this.cartService.update(dto, req.id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.cartService.remove(+id);
  }
}