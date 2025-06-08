import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './model/review.model';
import { User } from 'src/users/models/user.model';
import { Product } from 'src/product/models/product.model';

@Module({
  imports:[SequelizeModule.forFeature([Review, User, Product])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
