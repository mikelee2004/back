import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderEntity } from './entities/order.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { ProductService } from 'src/product/product.service';
import { CarbrandEntity } from 'src/carbrand/entities/carbrand.entity';
import { OrderItemEntity } from './entities/order_item.entity';
import { UserModule } from 'src/user/user.module';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderItemEntity,
      OrderEntity]),
    UserModule,
    CartModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
