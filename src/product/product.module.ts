import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './product.repository';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { CategoryModule } from 'src/category/category.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsRepository]),
    NestjsFormDataModule,
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
