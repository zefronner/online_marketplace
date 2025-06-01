import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
import config from './config';
import { Admin } from './admin/models/admin.model';
import { DeliveryModule } from './delivery/delivery.module';
import { ImagesModule } from './images/images.module';
import { Delivery } from './delivery/model/delivery.model';

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
      models: [Admin, Delivery],
    }),
    AdminModule,
    DeliveryModule,
    ImagesModule,
  ],
})
export class AppModule {}
