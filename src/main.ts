import { ConfigService } from '@nestjs/config';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app';
import { NODE_ENV } from './app/constants';
import { setupSwagger } from './util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  const PORT = +configService.get<number>('PORT');

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
    defaultVersion: '1',
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  if (configService.get<string>('NODE_ENV') === NODE_ENV.DEVELOPMENT) {
    setupSwagger(app);
  }

  await app.listen(PORT);
}
bootstrap();
