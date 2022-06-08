import { CreateProductDto } from './dto/create-product.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductsRepository } from './product.repository';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryService } from 'src/category/category.service';
import * as randomsString from 'randomstring';
import { async } from 'rxjs';
import { getConnection } from 'typeorm';
import { ItemFlashsale } from 'src/item-flashsales/entities/item-flashsale.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    public productRepository: ProductsRepository,
    private categoryService: CategoryService,
  ) {}
  async createProduct(
    createProductDto: CreateProductDto,
    file: Express.Multer.File,
  ) {
    try {
      // gen barcode
      const barcode = randomsString.generate({
        length: 6,
        charset: 'alphabetic',
        capitalization: 'uppercase',
      });
      const {
        categoryId,
        name,
        import_price,
        sell_price,
        description,
        quantity,
      } = createProductDto;
      const category = await this.categoryService.findOne(categoryId);
      const path = file.path;
      if (category) {
        const product = await this.productRepository.create({
          name,
          import_price,
          sell_price,
          description,
          quantity,
          barcode,
          category: category,
          product_img: path,
        });
        await this.productRepository.save(product);
        return {
          code: 200,
          message: 'Create product successful',
          data: product,
        };
      } else {
        return { code: 404, message: 'Category not found' };
      }
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }

  findAll() {
    return this.productRepository.find({ where: { status: true } });
  }

  async findOne(id: string) {
    return await this.productRepository.findOne({
      relations: ['imgDetail', 'category'],
      where: { id },
    });
  }

  update(
    id: string,
    updateProductDto: UpdateProductDto,
    file: Express.Multer.File,
  ) {
    return this.productRepository.updateProduct(id, updateProductDto, file);
  }

  remove(id: string) {
    return this.productRepository.destroyProduct(id);
  }

  async getItemWithFlashsale(id: string) {
    const timeNow = new Date();
    const query = await getConnection()
      .createQueryBuilder()
      .select('product')
      .addSelect('item_flashsale')
      .addSelect('flashsale')
      .addSelect('product.sell_price', 'price')
      .addSelect(
        '(product.sell_price*(100-item_flashsale.discount))/100',
        'realPrice',
      )
      .from(Product, 'product')
      .leftJoin('product.itemFlashsale', 'item_flashsale')
      .leftJoin('item_flashsale.flashsale', 'flashsale')
      .where('product.id = :id', { id })
      .andWhere('flashsale.startSale < :timeNow', { timeNow })
      .andWhere('flashsale.endSale > :timeNow', { timeNow })
      .execute();
    return query[0];
  }
}
