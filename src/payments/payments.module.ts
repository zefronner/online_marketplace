import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from './models/payment.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Orders } from 'src/orders/models/order.model';

@Module({
  imports:[SequelizeModule.forFeature([Payment, Orders])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
