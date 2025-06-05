import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './models/cart.model';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart) private readonly cartModel: typeof Cart) {}

  async create(dto: CreateCartDto): Promise<Cart> {
    return this.cartModel.create({ ...dto as any });
  }

  async findAll(): Promise<Cart[]> {
    return this.cartModel.findAll();
  }

  async findOne(id: number): Promise<Cart | object> {
    const cart = await this.cartModel.findByPk(id);
    if (!cart) return { message: 'Cart not found' };
    return cart;
  }

  async update(id: number, dto: UpdateCartDto): Promise<Cart | object> {
    const [count, [updated]] = await this.cartModel.update(dto, {
      where: { id },
      returning: true,
    });
    if (count === 0) return { message: 'Cart not found or nothing to update' };
    return updated;
  }

  async remove(id: number): Promise<object> {
    const deleted = await this.cartModel.destroy({ where: { id } });
    if (!deleted) return { message: 'Cart not found' };
    return { message: 'Cart deleted successfully' };
  }
}
