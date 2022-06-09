import { OrderDetailService } from './../order_detail/order_detail.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { VoucherService } from 'src/voucher/voucher.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    public orderRepository: OrderRepository,
    private readonly voucherService: VoucherService,
    private readonly orderDetailService: OrderDetailService,
  ) {}
  async create(createOrderDto: CreateOrderDto, user: User) {
    try {
      let total_money = 0;
      const {
        full_name,
        address,
        phone_number,
        description,
        order_details,
        voucher_id,
      } = createOrderDto;

      // check product nếu bị trùng thì sẽ gộp đơn vào với nhau
      const orderDetails = Object.values(
        order_details.reduce((acc, item) => {
          acc[item.product_id] = acc[item.product_id]
            ? {
                ...item,
                quantity: item.quantity + acc[item.product_id].quantity,
              }
            : item;
          return acc;
        }, {}),
      );

      // tạo order
      const order = await this.orderRepository.create({
        full_name,
        address,
        phone_number,
        description,
        user,
      });
      await this.orderRepository.save(order);
      if (order) {
        const order_detail = await orderDetails.map((order_detail) => {
          return this.orderDetailService.create(order_detail, order);
        });
        const od = await Promise.all(order_detail);
        await od.map((orderdetail) => {
          total_money += orderdetail.price;
        });
        //check voucher
        if (voucher_id) {
          const dateNow = new Date().getTime();
          const voucher = await this.voucherService.voucherRepository.findOne(
            voucher_id,
          );
          if (!voucher) return { code: 404, message: 'Voucher not found' };
          const startTime = new Date(voucher.startTime).getTime();
          const endTime = new Date(voucher.endTime).getTime();
          if (voucher.quantity == 0)
            return { code: 404, message: 'voucher đã hết số lượng sử dụng' };
          if (dateNow < startTime || endTime < dateNow) {
            return {
              code: 404,
              message: 'thời hạn voucher đã kết thúc hoặc chưa diễn ra',
            };
          }
          if (voucher.status === false) {
            return { code: 404, message: 'Voucher không thể sử dụng lúc này' };
          }
          voucher.quantity = voucher.quantity - 1;
          await this.voucherService.voucherRepository.save(voucher);
          if (voucher.unit === 'đ') {
            total_money = total_money - voucher.discount;
          } else {
            total_money = (total_money * (100 - voucher.discount)) / 100;
          }
          order.voucher = voucher;
        }
        order.total_money = total_money;
        await this.orderRepository.save(order);
        return { code: 200, message: 'Create order successfull', order };
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll(user: User) {
    return this.orderRepository.find({ where: { user } });
  }

  async findOne(id: string) {
    return this.orderRepository.find({
      relations: ['user', 'order_details', 'voucher'],
      where: { id },
    });
    // const query = await getConnection()
    //   .createQueryBuilder()
    //   .select('product.name', 'product_name')
    //   .addSelect('order')
    //   .addSelect('order_detail')
    //   .addSelect('user')
    //   .from(Order, 'order')
    //   .innerJoin('order.user', 'user')
    //   .innerJoin('order.voucher', 'voucher')
    //   .innerJoin('order.order_details', 'order_detail')
    //   .innerJoin('order_detail.product', 'product')
    //   .where('order.id = :id', { id })
    //   .execute();
    // return query;
  }

  async remove(id: string) {
    try {
      const order = await this.orderRepository.findOne(id);
      if (!order) return { code: 404, message: 'Order not found' };
      if (order.status === 'SHIPPING')
        return {
          code: 404,
          message: 'Không được xoá đơn hàng trong trạng thái đang vận chuyển',
        };
      const order_detail =
        await this.orderDetailService.orderDetailRepository.find({
          where: { order },
        });
      await this.orderDetailService.orderDetailRepository.softRemove(
        order_detail,
      );
      await this.orderRepository.softRemove(order);
      return { code: 200, message: 'Order deleted successful' };
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }

  update(updateOrderDto: UpdateOrderDto, id: string) {
    return this.orderRepository.updateOrder(updateOrderDto, id);
  }
}
