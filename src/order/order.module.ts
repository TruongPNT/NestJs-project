import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { UserModule } from '../user/user.module';
import { OrderDetailModule } from '../order_detail/order_detail.module';
import { VoucherModule } from '../voucher/voucher.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository]),
    NestjsFormDataModule,
    UserModule,
    VoucherModule,
    OrderDetailModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
