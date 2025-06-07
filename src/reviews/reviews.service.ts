import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './model/review.model';
import { handleError } from 'src/utils/catch-error';
import { User } from 'src/users/models/user.model';

@Injectable()
export class ReviewsService {
  constructor (
    @InjectModel(Review) private reviewModel: typeof Review,
    @InjectModel(User) private userModel: typeof User
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<object> {
    try {
      const { userId, productId } = createReviewDto;
      const user = await this.userModel.findByPk(userId);
      if (!user) {
        throw new NotFoundException(`User with ID ${createReviewDto.userId} does not exist`);
      };
      const review = await this.reviewModel.create({
        ...createReviewDto
      });
      return {
        statusCode: 201,
        message: "success",
        data: review
      }
    } catch (error) {
      return handleError(error);
    }
  }

  async findAll(): Promise<object> {
    return await this.reviewModel.findAll({ include: [{ model: User }]});
  };

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewModel.findByPk(id);
    if(!review) {
      throw new NotFoundException('Id not found');
    }; 
    return review;
  };

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<object> {
    const { userId, productId } = updateReviewDto;
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${updateReviewDto.userId} does not exist`);
    };
    const updatedReview = await this.reviewModel.update({
      ...updateReviewDto
    }, { where: { id }, returning: true });
    return updatedReview;
  };
  
  async remove(id: number): Promise<object> {
    const review = await this.reviewModel.destroy({ where: { id }});
    if(!review) {
      throw new NotFoundException('Id not found');
    }; 
    return {
      message: "success"
    }
  }
}
