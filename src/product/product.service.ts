import { CreateProductDto } from './dto/create-product.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductsRepository } from './product.repository';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryService } from 'src/category/category.service';
import * as randomsString from 'randomstring';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductsRepository,
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
    // .createQueryBuilder('p')
    // .innerJoinAndSelect('img_detail', 'imgd', 'p.id = imgd.productId')
    // .where('p.id = :id', { id: id })
    // .getOne();
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
}
