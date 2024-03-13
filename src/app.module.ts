import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { PromoModule } from './promo/promo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    CategoryModule,
    PromoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
