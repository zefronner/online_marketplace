import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Delivery } from './models/delivery.model';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { handleError } from 'src/utils/catch-error';
import { Orders } from 'src/orders/models/order.model';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel(Delivery) private model: typeof Delivery,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto): Promise<object> {
    try {
      const newDelivery = await this.model.create({
        ...createDeliveryDto
      });
      return { 
        statusCode: 201,
        message: "Success",
        data: newDelivery
      };
    } catch (error) {
      return handleError(error);
    }
  }

  async findAll(): Promise<Delivery[]> {
    return this.model.findAll({ include: { model: Orders }});
  }

  async findOne(id: number): Promise<Delivery | object> {
    const delivery = await this.model.findByPk(id, { include: { model: Orders }});
    if (!delivery) {
      return { message: 'not found' };
    }
    return delivery;
  }

  async update(id: number, updateDeliveryDto: UpdateDeliveryDto): Promise<Delivery | object> {
    const [affectedCount, updated] = await this.model.update(updateDeliveryDto, {
      where: { id },
      returning: true,
    });

    if (affectedCount === 0) {
      return { message: 'not found or not updated' };
    }

    return updated[0];
  }

  async remove(id: number): Promise<object> {
    await this.model.destroy({ where: { id } });
    return { message: 'success' };
  };
}
