import { CreateProductDto } from './dto/create-product.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductsRepository } from './product.repository';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryService } from '../category/category.service';
import * as randomsString from 'randomstring';
import { getConnection } from 'typeorm';
import { Product } from './entities/product.entity';
import * as fs from 'fs';

@Injectable()
export class ProductService {
  constructor(
    public productRepository: ProductsRepository,
    public categoryService: CategoryService,
  ) {}
  async createProduct(
    createProductDto: CreateProductDto,
    file?: Express.Multer.File,
  ) {
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
    if (!categoryId)
      throw new ConflictException('Category không được để trống');
    const category = await this.categoryService.findOne(categoryId);
    if (!category) throw new NotFoundException('Category not found');
    let pathIMG = '';
    if (file) pathIMG = file.path;
    const product = await this.productRepository.create({
      name,
      import_price,
      sell_price,
      description,
      quantity,
      barcode,
      category: category,
      product_img: pathIMG,
    });
    await this.productRepository.save(product);
    return {
      code: 200,
      message: 'Create product successful',
      data: product,
    };
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    try {
      const product = await this.productRepository.findOne({
        relations: ['category'],
        where: { id },
      });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      return error.response;
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    file?: Express.Multer.File,
  ) {
    const product = await this.productRepository.findOne({ id: id });
    if (!product) throw new NotFoundException('Product not found');
    if (file) {
      if (fs.existsSync(product.product_img)) {
        fs.unlinkSync(`./${product.product_img}`);
      }
      product.product_img = file.path;
    }
    const { name, import_price, sell_price, description, quantity } =
      updateProductDto;
    product.name = name;
    product.import_price = import_price;
    product.sell_price = sell_price;
    product.description = description;
    product.quantity = quantity;
    await this.productRepository.save(product);
    return {
      code: 200,
      message: 'Update product successful',
      data: product,
    };
  }

  async remove(id: string) {
    const product = await this.productRepository.findOne(id);
    if (!product) throw new NotFoundException('Product not found');
    const result = await this.productRepository.softRemove(product);
    if (result) return { code: 200, message: 'Delete product successful' };
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
      .andWhere('flashsale.startSale <= :timeNow', { timeNow })
      .andWhere('flashsale.endSale >= :timeNow', { timeNow })
      .execute();
    return query[0];
  }

  async updateIsSaleTrue(id: string) {
    const product = await this.productRepository.findOne(id);
    if (!product) throw new NotFoundException('Product not found');
    if (!product.is_sale) {
      await this.productRepository.save({
        ...product,
        is_sale: true,
      });
    }
  }

  async updateIsSaleFalse(id: string) {
    const product = await this.productRepository.findOne(id);
    if (!product) throw new NotFoundException('Product not found');
    if (product.is_sale) {
      await this.productRepository.save({
        ...product,
        is_sale: false,
      });
    }
  }
}
