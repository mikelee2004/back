import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { CategoryModule } from 'src/category/category.module';
import { CarbrandEntity } from 'src/carbrand/entities/carbrand.entity';
import { CarbrandModule } from 'src/carbrand/carbrand.module';

@Module({
  imports: [
    ConfigModule, 
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity]),
    CategoryModule,
    CarbrandModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
