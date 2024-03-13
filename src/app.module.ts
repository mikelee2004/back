import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { PromoModule } from './promo/promo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPostgresConfig } from './configs/postgres.config';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    CategoryModule,
    PromoModule,
    ProductModule,
  ],

})
export class AppModule {}
