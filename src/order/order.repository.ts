import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async updateOrder(updateOrderDto: UpdateOrderDto, id: string) {
    try {
      const order = await this.findOne(id);
      if (!order) return { code: 404, message: 'Order not found' };
      await this.save({ ...order, ...updateOrderDto });
      return { code: 200, message: 'Order updated' };
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }
}
