import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentsModule } from './payments/payments.module';
import { DeliveryModule } from './delivery/delivery.module';
// import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import  config  from './config';
import { Category } from './category/model/category.model';
import { Product } from './product/models/product.model';

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
      models: [Category, Product]
    }),
    PaymentsModule,
    DeliveryModule,
    AdminModule,
    // UsersModule
  ]
})
export class AppModule {}
