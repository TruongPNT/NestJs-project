import { Controller, Get, Param, UseFilters, UseGuards } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { Roles } from '../authorization/roles.decorator';
import { UserRole } from '../user/dto/user-roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('order-detail')
@ApiTags('Order-detail')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@UseFilters(HttpExceptionFilter)
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  // @Post()
  // create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
  //   return this.orderDetailService.create(createOrderDetailDto);
  // }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.orderDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderDetailService.findOne(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateOrderDetailDto: UpdateOrderDetailDto,
  // ) {
  //   return this.orderDetailService.update(id, updateOrderDetailDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderDetailService.remove(id);
  // }
}
