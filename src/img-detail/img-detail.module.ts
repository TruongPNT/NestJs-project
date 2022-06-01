import { Module } from '@nestjs/common';
import { ImgDetailService } from './img-detail.service';
import { ImgDetailController } from './img-detail.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImgDetailsRepository } from './img-detail.repository';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImgDetailsRepository]),
    NestjsFormDataModule,
    ProductModule,
  ],
  controllers: [ImgDetailController],
  providers: [ImgDetailService],
})
export class ImgDetailModule {}
