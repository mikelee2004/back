import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { PromoModule } from './promo/promo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPostgresConfig } from './configs/postgres.config';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';
import { CarbrandModule } from './carbrand/carbrand.module';
import { AuthModule } from './auth/auth.module';




@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    CategoryModule,
    PromoModule,
    ProductModule,
    CartModule,
    UserModule,
    CarbrandModule,
    AuthModule,
  ],

})
export class AppModule {}
