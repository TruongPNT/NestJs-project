import { Product } from './entities/product.entity';
import { Repository, EntityRepository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import * as fs from 'fs';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {}
