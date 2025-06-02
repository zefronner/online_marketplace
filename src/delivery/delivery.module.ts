import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Delivery } from './model/delivery.model';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';

@Module({
  imports: [SequelizeModule.forFeature([Delivery])],
  providers: [DeliveryService],
  controllers: [DeliveryController],
})
export class DeliveryModule {}
