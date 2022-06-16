import { BadRequestException } from '@nestjs/common';
import { Order } from '../order/entities/order.entity';
import { Product } from '../product/entities/product.entity';
import { EntityRepository, Repository } from 'typeorm';
import { OrderDetail } from './entities/order_detail.entity';

@EntityRepository(OrderDetail)
export class OrderDetailRepository extends Repository<OrderDetail> {
  async createOrderDetail(
    order: Order,
    quantity: number,
    product: Product,
    price: number,
  ) {
    try {
      const orderDetail = await this.create({
        order,
        quantity,
        product,
        price,
      });
      await this.save(orderDetail);
      if (orderDetail) return orderDetail;
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }
  async destroyOrderDetail(id: string) {
    try {
      const orderDetail = await this.findOne(id);
      if (!orderDetail) return { code: 200, message: 'Order detail not found' };
      await this.softRemove(orderDetail);
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }
}
