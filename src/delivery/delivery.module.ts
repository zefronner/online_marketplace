import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Delivery } from './models/delivery.model';
import { Orders } from 'src/orders/models/order.model';

@Module({
  imports:[SequelizeModule.forFeature([Delivery, Orders])],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}
