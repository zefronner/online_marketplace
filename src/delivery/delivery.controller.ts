import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { SelfGuard } from 'src/guards/self.guard';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveryService.create(createDeliveryDto);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Get()
  findAll() {
    return this.deliveryService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryService.findOne(+id);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    return this.deliveryService.update(+id, updateDeliveryDto);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryService.remove(+id);
  }
}
