import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { Like } from './models/like.model';

@Module({
  imports: [SequelizeModule.forFeature([Like])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
