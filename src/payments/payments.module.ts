import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { Payment } from './models/payment.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Orders } from 'src/orders/models/order.model';

@Module({
  imports:[SequelizeModule.forFeature([Payment, Orders])],
import { RolesGuard } from './guards/roles.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  imports: [SequelizeModule.forFeature([Payment])],
  controllers: [PaymentsController],
  providers: [PaymentsService, RolesGuard, LoggingInterceptor],
})
export class PaymentsModule {}
