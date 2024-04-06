import { Module } from '@nestjs/common';
import { CarbrandService } from './carbrand.service';
import { CarbrandController } from './carbrand.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarbrandEntity } from './entities/carbrand.entity';
import { CategoryModule } from 'src/category/category.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([CarbrandEntity]),
  ],
  controllers: [CarbrandController],
  providers: [CarbrandService],
})
export class CarbrandModule {}
