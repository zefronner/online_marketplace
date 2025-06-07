import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './model/category.model';
import { Product } from 'src/product/models/product.model';

@Injectable()
export class CategoryService {

  constructor(@InjectModel(Category) private CategoryModel: typeof Category) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const {title, description} = createCategoryDto
      const categoryCheck = await this.CategoryModel.findOne({where: { title } })
      if(categoryCheck){
        throw new ConflictException(`${title} nomli Category Mavjud !!!`)
      }
      const category = await this.CategoryModel.create({
        ...createCategoryDto
      });
      return {
        statusCode: 201,
        message: "Category yaratildi",
        data: category
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.CategoryModel.findAll({include: {model: Product}, order: [['id', 'ASC']]});
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.CategoryModel.findByPk(id,{include: {model: Product}})
      if(!category){
        throw new NotFoundException(`Category ${id} topilmadi !!!`)
      }
      return {
        statusCode: 200,
        data: category
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try  {
      const category = await this.CategoryModel.findByPk(id)
      if(!category){
        throw new NotFoundException(`Category ${id} topilmadi !!!`)
      }
      if (updateCategoryDto.title && updateCategoryDto.title !== category.title) {
        const categoryCheck = await this.CategoryModel.findOne({ where: { title: updateCategoryDto.title } });
        if (categoryCheck) {
          throw new ConflictException(`${updateCategoryDto.title} nomli Category Mavjud !!!`);
        }
      }
      const updatedCategory  = await category.update(updateCategoryDto)
      return {
        statusCode: 200,
        message: 'Muvaffaqqiyatli Yangilandi',
        data: updatedCategory
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: number) {
    try {
      const category = await this.CategoryModel.findByPk(id)
      if(!category){
        throw new NotFoundException('Category ${id} topilmadi !!!')
      }      
      await category.destroy();
      return {
        statusCode: 200,
        message: 'Category ochirildi'
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
