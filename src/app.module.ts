import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentsModule } from './payments/payments.module';
import { DeliveryModule } from './delivery/delivery.module';
import { CartModule } from './carts/cart.module';
import { AdminModule } from './admin/admin.module';
import  config  from './config';
import { Category } from './category/model/category.model';
import { Product } from './product/models/product.model';
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
import { Review } from './reviews/model/review.model';
import { Orders } from './orders/models/order.model';
import { Cart } from './carts/models/cart.model';
import { User } from './users/models/user.model';
import { Delivery } from './delivery/models/delivery.model';
import { Payment } from './payments/models/payment.model';

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
      models: [Category, Product, Review, Orders, Cart, User, Delivery, Payment]
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
    CartModule,
    AdminModule,
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
