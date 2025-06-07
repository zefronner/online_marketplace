import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { TokenService } from 'src/utils/TokenService';
import { MailService } from 'src/mail/mail.service';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), FileModule],
  controllers: [UsersController],
  providers: [UsersService, MailService, TokenService],
})
export class UsersModule {}
