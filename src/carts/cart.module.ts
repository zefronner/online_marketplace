import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from './models/cart.model';
import { RolesGuard } from './guards/roles.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  imports: [SequelizeModule.forFeature([Cart])],
  controllers: [CartController],
  providers: [CartService, RolesGuard, LoggingInterceptor],
})
export class CartModule {}
