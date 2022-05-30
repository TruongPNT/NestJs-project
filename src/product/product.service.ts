import { CreateProductDto } from './dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './product.repository';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductsRepository) {}
  async createProduct(
    createProductDto: CreateProductDto,
    file: Express.Multer.File,
  ) {
    return this.productRepository.createProduct(createProductDto, file);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    return this.productRepository.findOne({ id: id });
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
