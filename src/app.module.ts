import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import config from './config';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: config.PG_HOST,
      port: Number(config.PG_PORT),
      username: config.PG_USER,
      password: config.PG_PASS,
      database: config.PG_DB,
      synchronize: true,
      logging: false,
      autoLoadModels: true,
      models: []
    })
  ],
})
export class AppModule {}
