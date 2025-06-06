import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentsModule } from './payments/payments.module';
import { DeliveryModule } from './delivery/delivery.module';
import { LikesModule } from './likes/likes.module';
import { CartModule } from './carts/cart.module';
// import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import  config  from './config';
import { MailModule } from './mail/mail.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

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
    MailModule,
    PaymentsModule,
    DeliveryModule,
    LikesModule,
    CartModule
    AdminModule,
    // UsersModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ]
})
export class AppModule {}
