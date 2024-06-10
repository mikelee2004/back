import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { ConfigModule } from "@nestjs/config";
import { CartEntity } from "./entities/cart.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModule } from "src/product/product.module";
import { ProductEntity } from "src/product/entities/product.entity";
import { UserEntity } from "src/user/entities/user.entity";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([CartEntity, ProductEntity, UserEntity]),
    ProductEntity,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
