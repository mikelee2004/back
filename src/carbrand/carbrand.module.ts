import { Module } from '@nestjs/common';
import { CarbrandService } from './carbrand.service';
import { CarbrandController } from './carbrand.controller';

@Module({
  controllers: [CarbrandController],
  providers: [CarbrandService],
})
export class CarbrandModule {}
