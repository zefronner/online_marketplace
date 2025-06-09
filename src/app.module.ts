import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { User } from './user/entities/user.entity';
import { Review } from './review/entities/review.entity';
import config from './config/index';


@Module({
   imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: config.PG_HOST,
      port: config.PG_PORT,
      username: config.PG_USER,
      password: config.PG_PASS,
      database: config.PG_DB,
      logging: false,
      synchronize: true,
      autoLoadModels: true,
      models: [User,Review]
}),

    UserModule,
    ReviewModule
  ],
})
export class AppModule {}
