import { BadRequestException, Injectable } from '@nestjs/common';
import { Flashsale } from 'src/flashsales/entities/flashsale.entity';
import { FlashsalesService } from 'src/flashsales/flashsales.service';
import { ProductsRepository } from 'src/product/product.repository';
import { ProductService } from 'src/product/product.service';
import { CreateItemFlashsaleDto } from './dto/create-item-flashsale.dto';
import { UpdateItemFlashsaleDto } from './dto/update-item-flashsale.dto';
import { ItemFlashSalesRepository } from './item-flashsales.repository';

@Injectable()
export class ItemFlashsalesService {
  constructor(
    public itemFlashsaleRepository: ItemFlashSalesRepository,
    private readonly productService: ProductService,
  ) {}
  async create(
    createItemFlashsaleDto: CreateItemFlashsaleDto,
    flashSale: Flashsale,
  ) {
    const { productId, quantity } = createItemFlashsaleDto;
    const product = await this.productService.findOne(productId);
    // kiểm tra số lượng flash sale với số lượng trong kho
    if (product) {
      if (quantity > product.quantity)
        return {
          code: 404,
          message:
            'Số lượng flashSale không được lớn hơn số lượng trong kho của sản phẩm ',
        };
    }
    return this.itemFlashsaleRepository.createItemFlashSale(
      createItemFlashsaleDto,
      product,
      flashSale,
    );
  }

  findAll() {
    return this.itemFlashsaleRepository.find();
  }

  findOne(id: string) {
    return this.itemFlashsaleRepository.findOne(id);
  }

  async update(id: string, updateItemFlashsaleDto: UpdateItemFlashsaleDto) {
    try {
      const { quantity, discount } = updateItemFlashsaleDto;
      const itemFlashSale = await this.findOne(id);
      if (!itemFlashSale)
        return { code: 404, message: 'ItemFlashSale not found' };
      const product = await this.productService.findOne(
        itemFlashSale.product.id,
      );
      if (!product) return { code: 404, message: 'Product not found' };
      if (quantity) {
        if (quantity > product.quantity + itemFlashSale.quantity) {
          return {
            code: 404,
            message:
              'Số lượng flash sale không được lớn hơn số lượng còn lại trong kho',
          };
        }
        product.quantity = product.quantity + itemFlashSale.quantity - quantity;
        await this.productService.productRepository.save(product);
      }
      itemFlashSale.quantity = quantity;
      itemFlashSale.discount = discount;
      return this.itemFlashsaleRepository.updateItemFlashSale(
        itemFlashSale,
        updateItemFlashsaleDto,
      );
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }

  remove(id: string) {
    return this.itemFlashsaleRepository.deleteItemFlashSale(id);
  }
}
