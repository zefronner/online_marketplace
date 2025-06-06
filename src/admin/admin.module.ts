import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { MailModule } from 'src/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from 'src/utils/TokenService';

@Module({
  imports: [
    SequelizeModule.forFeature([Admin]),
    MailModule,
    JwtModule.register({
      global: true
    })
  ],
  controllers: [AdminController],
  providers: [AdminService, TokenService],
})
export class AdminModule {}