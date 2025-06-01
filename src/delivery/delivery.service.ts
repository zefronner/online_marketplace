import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Delivery } from './model/delivery.model';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel(Delivery)
    private deliveryModel: typeof Delivery,
  ) {}

  create(createDeliveryDto: CreateDeliveryDto) {
    return this.deliveryModel.create(createDeliveryDto);
  }

  findAll() {
    return this.deliveryModel.findAll();
  }

  findOne(id: number) {
    return this.deliveryModel.findByPk(id);
  }

  async update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    await this.deliveryModel.update(updateDeliveryDto, { where: { id } });
    return this.findOne(id);
  }

  remove(id: number) {
    return this.deliveryModel.destroy({ where: { id } });
  }
}
