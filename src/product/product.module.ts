import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './product.repository';
import { NestjsFormDataModule } from 'nestjs-form-data';
@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsRepository]),
    NestjsFormDataModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
