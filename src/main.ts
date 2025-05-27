import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';

async function start() {
  const PORT = config.PORT;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log('Server is running on port', PORT));
}
start();
