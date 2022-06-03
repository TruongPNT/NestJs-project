import { BadRequestException } from '@nestjs/common';
import { Flashsale } from 'src/flashsales/entities/flashsale.entity';
import { Product } from 'src/product/entities/product.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateItemFlashsaleDto } from './dto/create-item-flashsale.dto';
import { UpdateItemFlashsaleDto } from './dto/update-item-flashsale.dto';
import { ItemFlashsale } from './entities/item-flashsale.entity';

@EntityRepository(ItemFlashsale)
export class ItemFlashSalesRepository extends Repository<ItemFlashsale> {
  async createItemFlashSale(
    createItemFlashsaleDto: CreateItemFlashsaleDto,
    product: Product,
    flashsale: Flashsale,
  ) {
    try {
      const { quantity, discount } = createItemFlashsaleDto;
      const itemFlashSale = await this.create({
        flashsale,
        product,
        quantity: quantity,
        discount: discount,
      });
      await this.save(itemFlashSale);
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }
  async updateItemFlashSale(
    itemFlashSale: ItemFlashsale,
    updateItemFlashsaleDto: UpdateItemFlashsaleDto,
  ) {
    try {
      const result = await this.save({
        ...itemFlashSale,
        ...updateItemFlashsaleDto,
      });
      if (result)
        return { code: 200, message: 'Update itemFlashSale successful' };
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }
  async deleteItemFlashSale(id: string) {
    try {
      const itemFlashSale = await this.findOne(id);
      if (!itemFlashSale)
        return { code: 404, message: 'itemFlashSale not found' };
      const result = await this.softRemove(itemFlashSale);
      if (result)
        return { code: 200, message: 'delete itemFlashSale successful' };
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }
}
