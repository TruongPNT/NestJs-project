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

import { AuthGuard } from '@nestjs/passport';
import { FormDataRequest } from 'nestjs-form-data';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../authorization/roles.decorator';
import { UserRole } from '../user/dto/user-roles.enum';

@Controller('order')
@ApiTags('Order')
@ApiBearerAuth()
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
  @Roles(UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(@Body() updateOrderDto: UpdateOrderDto, @Param('id') id: string) {
    return this.orderService.update(updateOrderDto, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
