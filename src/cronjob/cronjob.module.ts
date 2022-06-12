import { Module } from '@nestjs/common';
import { FlashsalesModule } from 'src/flashsales/flashsales.module';
import { ItemFlashsalesModule } from 'src/item-flashsales/item-flashsales.module';
import { ProductModule } from 'src/product/product.module';
import { SendmailModule } from 'src/sendmail/sendmail.module';
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
