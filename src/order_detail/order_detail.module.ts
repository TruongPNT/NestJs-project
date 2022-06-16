import { Module } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { OrderDetailController } from './order_detail.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailRepository } from './order_detail.repository';
import { ProductModule } from '../product/product.module';
import { ItemFlashsalesModule } from '../item-flashsales/item-flashsales.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetailRepository]),
    NestjsFormDataModule,
    ProductModule,
    ItemFlashsalesModule,
  ],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
  exports: [OrderDetailService],
})
export class OrderDetailModule {}
