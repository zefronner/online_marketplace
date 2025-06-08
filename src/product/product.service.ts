import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { Category } from 'src/category/model/category.model';

@Injectable()
export class ProductService {

  constructor(@InjectModel(Product) private ProductModel: typeof Product) {}

  async create(createProductDto: CreateProductDto) {
    const {name, price, categoryId,inStock} = createProductDto
    const productCheck = await this.ProductModel.findOne({where: {name}})
    if(!name){
      throw new ConflictException("Product Mavjud")
    }
    const product = await this.ProductModel.create({...createProductDto})
    return{
      statusCode: 201,
      message: 'Yangi Product yaratildi',
      data: product
    }
  }

  async findAll() {
    try {
      const products = await this.ProductModel.findAll({ include: { model: Category }});
      return {
        statusCode: 200,
        data: products
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.ProductModel.findByPk(id, { include: { model: Category }});
      if(!product){
        throw new NotFoundException(`Product id: ${id} topilmadi`)
      }      
      return {
        statusCode: 200,
        data: product
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.ProductModel.findByPk(id);
      if(!product){
        throw new NotFoundException(`Product id: ${id} topilmadi`)
      }
      if(updateProductDto.name && updateProductDto.name !== product.name){
        const productCheck = await this.ProductModel.findOne({where: {name: updateProductDto.name}});
        if(productCheck){
          throw new ConflictException(`${updateProductDto.name} nomli Product Mavjud !!!`)
        }
      }
      const updatedProduct = await product.update(updateProductDto, { where: { id }, returning: true})
      return {
        statusCode: 200,
        message: 'Muvaffaqqiyatli yangilandi',
        data: updatedProduct
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: number) {
    try {
      const product = await this.ProductModel.findByPk(id);
      if(!product){
        throw new NotFoundException(`Product id: ${id} topilmadi`)
      }
      await product.destroy()
      return {
        statusCode: 200,
        message: 'Product ochirildi'
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
