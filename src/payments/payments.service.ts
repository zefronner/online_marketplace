import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { DATE } from 'sequelize';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment) private model: typeof Payment,
  ) {}

  async  create(createPaymentDto: CreatePaymentDto):Promise<Payment> {
    const group = await this.model.create({...createPaymentDto as any});
    return group
  }

  async findAll(): Promise<Payment[]> {
    return this.model.findAll();
  }

  async findOne(id: number): Promise<Payment | object> {
    const payment = await this.model.findByPk(id);
    if (!payment) {
      return { message: 'not found' };
    }
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment | object> {
    const payment = await this.model.update(
      updatePaymentDto,
      {where:{id},returning:true}
    )
    return payment
  }

  async remove(id: number): Promise<object> {
    await this.model.destroy({ where: { id } });
    return { message: 'success' };
  }
}
