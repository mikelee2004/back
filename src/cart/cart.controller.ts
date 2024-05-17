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
  async CreateCartItemDto(@Body() dto: CreateCartDto, @Request() req: any) {
    return await this.cartService.CreateCartItemDto(dto, req.user);
  }

  @Get()
  get(@Request() req: any) {
    return this.cartService.get(req.user.id);
  }

  @Get('all')
  findAll(@Request() req: any) {
    return this.cartService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.cartService.findOne(+id, req.user);
  }

  @Patch()
  async update(@Body() dto: UpdateCartDto, @Request() req: any) {
    return await this.cartService.update(dto, req.user);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() req: any): Promise<DeleteResult> {
    return this.cartService.remove(+id, req.user);
  }
}