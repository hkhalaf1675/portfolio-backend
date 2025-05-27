import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  const configService = app.get(ConfigService);
  const port = parseInt(configService.get<string>('port') ?? '6000', 10);

  await app.listen(port);
}
bootstrap();
