import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentsModule } from './payments/payments.module';
import { DeliveryModule } from './delivery/delivery.module';
import { AdminModule } from './admin/admin.module';
import  config  from './config';
import { MailModule } from './mail/mail.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { ReviewsModule } from './reviews/reviews.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { OrdersModule } from './orders/orders.module';

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
    CacheModule.register({
      isGlobal: true
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', '..', 'upload'),
      serveRoot: '/upload',
    }),
    JwtModule.register({
      global: true,
    }),
    MailModule,
    PaymentsModule,
    DeliveryModule,
    AdminModule,
    UsersModule,
    FileModule,
    ReviewsModule,
    UsersModule,
    CategoryModule,
    ProductModule,
    OrdersModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ]
})
export class AppModule {}
