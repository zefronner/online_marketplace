import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Orders } from './models/order.model';
import { User } from 'src/users/models/user.model';
import { Product } from 'src/product/models/product.model';

@Module({
  imports: [SequelizeModule.forFeature([Orders, User, Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
