import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SendmailModule } from './sendmail/sendmail.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './authorization/roles.guard';
import { ImgDetailModule } from './img-detail/img-detail.module';
import { VoucherModule } from './voucher/voucher.module';
import { CategoryModule } from './category/category.module';
import { ItemFlashsalesModule } from './item-flashsales/item-flashsales.module';
import { FlashsalesModule } from './flashsales/flashsales.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order_detail/order_detail.module';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '6246233',
      database: 'Project-nestjs',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MulterModule.register({
      dest: './files',
    }),
    UserModule,
    AuthModule,
    SendmailModule,
    ImgDetailModule,
    VoucherModule,
    CategoryModule,
    ItemFlashsalesModule,
    FlashsalesModule,
    OrderModule,
    OrderDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
