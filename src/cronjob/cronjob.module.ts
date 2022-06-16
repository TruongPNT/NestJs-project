import { Module } from '@nestjs/common';
import { FlashsalesModule } from '../flashsales/flashsales.module';
import { ItemFlashsalesModule } from '../item-flashsales/item-flashsales.module';
import { ProductModule } from '../product/product.module';
import { SendmailModule } from '../sendmail/sendmail.module';
import { CronjobService } from './cronjob.service';

@Module({
  providers: [CronjobService],
  imports: [
    ProductModule,
    FlashsalesModule,
    ItemFlashsalesModule,
    SendmailModule,
  ],
})
export class CronjobModule {}
