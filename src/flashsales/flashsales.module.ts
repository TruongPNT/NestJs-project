import { Module } from '@nestjs/common';
import { FlashsalesService } from './flashsales.service';
import { FlashsalesController } from './flashsales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ItemFlashsalesModule } from '../item-flashsales/item-flashsales.module';
import { FlashSalesRepository } from './flashsales.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FlashSalesRepository]),
    NestjsFormDataModule,
    ItemFlashsalesModule,
  ],
  controllers: [FlashsalesController],
  providers: [FlashsalesService],
  exports: [FlashsalesService],
})
export class FlashsalesModule {}
