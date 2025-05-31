import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = config.PORT;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );
  await app.listen(PORT, () => console.log('Server is running on port >>', PORT));
}
bootstrap();
