import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders } from './models/order.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { Product } from 'src/product/models/product.model';

@Injectable()
export class OrdersService {
  constructor (@InjectModel(Orders) private orderModel: typeof Orders,
  @InjectModel(User) private userModel: typeof User,
  @InjectModel(Product) private productModel: typeof Product,
) { }

  async createOrder(createOrderDto: CreateOrderDto): Promise<object> {
    const { userId, productId } = createOrderDto;

    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.productModel.findByPk(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const newOrder = await this.orderModel.create({
      ...createOrderDto
    });    
    return {
      statusCode: 201,
      message: 'Order created successfully',
      data: newOrder,
    };
  };

  async findAll(): Promise<Orders[]> {
    return this.orderModel.findAll({ include: [{ model: User }, { model: Product }]});
  }

  async findOne(id: number): Promise<Orders> {
    const order = await this.orderModel.findByPk(id, { include: [{ model: User }, { model: Product }]});
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Orders> {
    const order = await this.orderModel.findByPk(id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    if (updateOrderDto.userId) {
      const user = await this.userModel.findByPk(updateOrderDto.userId);
      if (!user) {
        throw new NotFoundException(`User with id ${updateOrderDto.userId} not found`);
      }
    }
    if (updateOrderDto.productId) {
      const product = await this.productModel.findByPk(updateOrderDto.productId);
      if (!product) {
        throw new NotFoundException(`Product with id ${updateOrderDto.productId} not found`);
      }
    }

    await order.update(updateOrderDto, { where: { id }, returning: true});
    return order;
  }

  async remove(id: number): Promise<{ message: string }> {
    const order = await this.orderModel.findByPk(id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    await order.destroy();
    return { message: 'Order deleted successfully' };
  }
}
