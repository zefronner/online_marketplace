import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { Payment } from './models/payment.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Orders } from 'src/orders/models/order.model';
import { LoggingInterceptor } from './interceptors/logging.interceptor'

@Module({
  imports: [SequelizeModule.forFeature([Payment, Orders])],
  controllers: [PaymentsController],
  providers: [PaymentsService, LoggingInterceptor],
})
export class PaymentsModule {}
