import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Like } from './models/like.model';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Injectable()
export class LikesService {
  constructor(@InjectModel(Like) private likeModel: typeof Like) {}

  async create(createLikeDto: CreateLikeDto) {
    return this.likeModel.create({...createLikeDto as any});
  }

  async findAll() {
    return this.likeModel.findAll();
  }

  async findOne(id: number) {
    const like = await this.likeModel.findByPk(id);
    if (!like) throw new NotFoundException('Like not found');
    return like;
  }

  async update(id: number, createLikeDto: UpdateLikeDto) {
    const like = await this.findOne(id);
    return like.update(createLikeDto);
  }

  async remove(id: number) {
    const like = await this.findOne(id);
    return like.destroy();
  }
}
