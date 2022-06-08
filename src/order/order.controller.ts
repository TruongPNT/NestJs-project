import { User } from 'src/user/entities/user.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from './entities/order.entity';
import { AuthGuard } from '@nestjs/passport';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('order')
@UseGuards(AuthGuard('jwt'))
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @FormDataRequest()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    const user = req.user;
    return this.orderService.create(createOrderDto, user);
  }

  @Get()
  findAll(@Req() req) {
    const user = req.user;
    return this.orderService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }
}
