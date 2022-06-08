import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { FlashSaleItem } from 'src/flashsales/dto/create-flashsale.dto';
import { ProductModule } from 'src/product/product.module';
import { ItemFlashsalesController } from './item-flashsales.controller';
import { ItemFlashSalesRepository } from './item-flashsales.repository';
import { ItemFlashsalesService } from './item-flashsales.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemFlashSalesRepository]),
    NestjsFormDataModule,
    ProductModule,
  ],
  controllers: [ItemFlashsalesController],
  providers: [ItemFlashsalesService],
  exports: [ItemFlashsalesService],
})
export class ItemFlashsalesModule {}
