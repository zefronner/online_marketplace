import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './models/cart.model';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { User } from 'src/users/models/user.model';
import { Product } from 'src/product/models/product.model';
import { handleError } from 'src/utils/catch-error';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart) private readonly cartModel: typeof Cart,
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Product) private readonly productModel: typeof Product,
) {}

  async create(dto: CreateCartDto): Promise<object> {
    try {
      const { userId, productId } = dto;
      const user = await this.userModel.findByPk(userId);
      if(!user) {
        throw new NotFoundException('User id not found');
      }
      const product = await this.productModel.findByPk(productId);
      if(!product) {
        throw new NotFoundException('Product id not found');
      };
      const cart = await this.cartModel.create({
        ...dto
      });
      return {
        statusCode: 201,
        message: "success",
        data: cart
      }
    } catch (error) {
      return handleError(error);
    }
    
  }

  async findAll(): Promise<Cart[]> {
    return this.cartModel.findAll({ include: [{ model: User}, { model: Product }]});
  }

  async findOne(id: number): Promise<Cart | object> {
    const cart = await this.cartModel.findByPk(id, { include: [{ model: User}, { model: Product }]});
    if (!cart) return { message: 'Cart not found' };
    return cart;
  }

  async update(id: number, dto: UpdateCartDto): Promise<Cart | object> {
    try {
      const { userId, productId } = dto;
      const user = await this.userModel.findByPk(userId);
      if(user) {
        throw new NotFoundException('User id already exists');
      }
      const product = await this.productModel.findByPk(productId);
      if(product) {
        throw new NotFoundException('Product id already exists');
      };
    const [count, [updated]] = await this.cartModel.update(dto, {
      where: { id },
      returning: true,
    });
    if (count === 0) return { message: 'Cart not found or nothing to update' };
    return updated;
    } catch (error) {
      return handleError(error);
    }
  }

  async remove(id: number): Promise<object> {
    const deleted = await this.cartModel.destroy({ where: { id } });
    if (!deleted) return { message: 'Cart not found' };
    return { message: 'Cart deleted successfully' };
  }
}
