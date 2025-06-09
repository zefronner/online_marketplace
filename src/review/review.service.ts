import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review)
    private ReviewModel: typeof Review,
  ) {}

  create(createReviewDto: CreateReviewDto) {
    return this.ReviewModel.create({...createReviewDto as any});

  }

  findAll() {
    return this.ReviewModel.findAll();
  }

  findOne(id: number) {
    return this.ReviewModel.findByPk(id);
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return this.ReviewModel.update(updateReviewDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.ReviewModel.destroy({ where: { id } });
  }

  async findByReviewname(Reviewname: string) {
    return this.ReviewModel.findOne({ where: { Reviewname  }});
  }
}
