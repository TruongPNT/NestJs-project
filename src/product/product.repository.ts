import { Product } from './entities/product.entity';
import { Repository, EntityRepository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import * as randomsString from 'randomstring';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import * as fs from 'fs';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  async createProduct(
    createProductDto: CreateProductDto,
    file: Express.Multer.File,
  ) {
    try {
      const barcode = randomsString.generate({
        length: 6,
        charset: 'alphabetic',
        capitalization: 'uppercase',
      });
      const path = file.path;
      const { name, import_price, sell_price, description, quantity } =
        createProductDto;
      const product = this.create({
        name,
        import_price,
        sell_price,
        description,
        quantity,
        barcode,
        product_img: path,
      });
      await this.save(product);
      return {
        code: 200,
        message: 'Create product successful',
        data: product,
      };
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }
  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
    file: Express.Multer.File,
  ) {
    try {
      const product = await this.findOne({ id: id });
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
      await this.save(product);
      return {
        code: 200,
        message: 'Update product successful',
        data: product,
      };
    } catch (error) {
      if (error.code === '22P02') {
        return {
          message: 'Product not found',
        };
      }
      throw new BadRequestException('Sever error');
    }
  }
  async destroyProduct(id: string) {
    try {
      const product = await this.findOne({ id: id });
      if (product) {
        await this.softRemove(product);
        return {
          code: 200,
          message: 'Product delete successful',
        };
      }
    } catch (error) {
      if (error.code === '22P02') {
        return {
          message: 'Product not found',
        };
      }
      return new BadRequestException('Sever error');
    }
  }
}
