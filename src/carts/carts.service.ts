// src/cart/cart.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './models/cart.model';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private model: typeof Cart,
  ) {}

  create(createCartDto: CreateCartDto) {
    return this.model.create({...createCartDto as any});
  }

  findAll() {
    return this.model.findAll();
  }
} 
