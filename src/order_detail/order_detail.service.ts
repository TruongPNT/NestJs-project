import { OrderDetailRepository } from './order_detail.repository';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { ProductService } from 'src/product/product.service';
import { ItemFlashsalesService } from 'src/item-flashsales/item-flashsales.service';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class OrderDetailService {
  constructor(
    public orderDetailRepository: OrderDetailRepository,
    private readonly productService: ProductService,
    private readonly itemFlashsalesService: ItemFlashsalesService,
  ) {}
  async create(createOrderDetailDto: CreateOrderDetailDto, order: Order) {
    try {
      let price = 0;
      const { product_id, quantity } = createOrderDetailDto;
      const product = await this.productService.findOne(product_id);
      if (!product) throw new NotFoundException('Product not found');

      // check sale price and quantity if product is sale
      if (product.is_sale === true) {
        const productSale = await this.productService.getItemWithFlashsale(
          product_id,
        );
        if (productSale) {
          if (quantity > productSale.item_flashsale_quantity) {
            throw new HttpException(
              {
                status: HttpStatus.FORBIDDEN,
                error: `số lượng mua không được vượt quá ${productSale.item_flashsale_quantity} sản phẩm`,
              },
              HttpStatus.FORBIDDEN,
            );
          }
          price = productSale.realPrice * quantity; // gán giá sau khi flash sale cho order detail
          const flashSaleItem =
            await this.itemFlashsalesService.itemFlashsaleRepository.findOne(
              productSale.item_flashsale_id,
            );
          if (flashSaleItem)
            flashSaleItem.quantity = flashSaleItem.quantity - quantity;
          await this.itemFlashsalesService.itemFlashsaleRepository.save(
            flashSaleItem,
          );
        }
      } else {
        if (quantity > product.quantity) {
          throw new HttpException(
            {
              status: HttpStatus.FORBIDDEN,
              error: `số lượng mua không được vượt quá ${product.quantity} sản phẩm`,
            },
            HttpStatus.FORBIDDEN,
          );
        }
        price = product.sell_price * quantity;
      }

      // trừ quantity sau khi tạo order detail thành công
      product.quantity -= quantity;
      await this.productService.productRepository.save(product);

      return this.orderDetailRepository.createOrderDetail(
        order,
        quantity,
        product,
        price,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll() {
    return this.orderDetailRepository.find();
  }

  findOne(id: string) {
    return this.orderDetailRepository.findOne({
      relations: ['product'],
      where: { id },
    });
  }

  remove(id: string) {
    return this.orderDetailRepository.destroyOrderDetail(id);
  }
}
