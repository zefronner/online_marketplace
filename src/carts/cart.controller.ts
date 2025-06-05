import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { RolesGuard } from './guards/roles.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { Roles } from './decorators/roles.decorator';

@Controller('cart')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @Roles('admin', 'user')
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateCartDto) {
    return this.cartService.create(dto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin', 'user')
  update(@Param('id') id: string, @Body() dto: UpdateCartDto) {
    return this.cartService.update(+id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
