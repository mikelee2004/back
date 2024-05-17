import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ConfigModule } from '@nestjs/config';
import { CartEntity } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemEntity } from './entities/cart-item.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([CartEntity, CartItemEntity]),
    ProductModule,
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule {}
