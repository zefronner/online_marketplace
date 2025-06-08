import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Orders } from 'src/orders/models/order.model';
import { handleError } from 'src/utils/catch-error';
import { error } from 'console';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment) private model: typeof Payment,
    @InjectModel(Orders) private orderModel: typeof Orders
  ) {}

  async  create(createPaymentDto: CreatePaymentDto):Promise<object> {
    try{ 
      const { orderId } = createPaymentDto;
      const order = await this.orderModel.findByPk(orderId);
      if(!order) {
        throw new NotFoundException(`Order not found by id: ${orderId}`)
      };
      const group = await this.model.create({...createPaymentDto as any});
      return { statusCode:201, message: 'success', data:group };
    } catch {
      return handleError(error);
    }
  }

  async findAll(): Promise<Payment[]> {
    return this.model.findAll({ include: { model: Orders }});
  }

  async findOne(id: number): Promise<Payment | object> {
    const payment = await this.model.findByPk(id, { include: { model: Orders }});
    @InjectModel(Payment) private readonly model: typeof Payment,
  ) {}

  async  create(createPaymentDto: CreatePaymentDto):Promise<Payment> {  
    const payment = await this.model.create({...createPaymentDto as any});
    return payment
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
    const { orderId } = updatePaymentDto;
    const order = await this.orderModel.findByPk(orderId);
      if(!order) {
        throw new NotFoundException(`Order not found by id: ${orderId}`)
      };
    const payment = await this.model.update(
      updatePaymentDto,
      { where:{id}, returning:true }
    )
    return { statusCode: 201, message: "success", data: payment}
  }

  async remove(id: number): Promise<object> {
    await this.model.destroy({ where: { id } });
    return {statusCode:201,  message: 'success' };
  }
}
