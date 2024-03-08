import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  const PORT = parseInt(process.env.PORT);
  const SERVER = process.env.SERVER;
  await app.listen(PORT, SERVER);

  console.log('Application is running on: ${await app.getUrl()}')
}
bootstrap();
