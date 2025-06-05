import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentsModule } from './payments/payments.module';
import { DeliveryModule } from './delivery/delivery.module';
import { LikesModule } from './likes/likes.module';
import { CartModule } from './carts/cart.module';
import  config  from './config';

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
      models: []
    }),
    PaymentsModule,
    DeliveryModule,
    LikesModule,
    CartModule
  ]
})
export class AppModule {}
