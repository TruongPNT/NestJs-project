import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { UserModule } from 'src/user/user.module';
import { OrderDetailModule } from 'src/order_detail/order_detail.module';
import { VoucherModule } from 'src/voucher/voucher.module';

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
