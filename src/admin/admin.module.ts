import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { MailModule } from 'src/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from 'src/utils/TokenService';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Admin]),
    MailModule,
    FileModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, TokenService],
})
export class AdminModule {}
