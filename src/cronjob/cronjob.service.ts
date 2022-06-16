import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { FlashsalesService } from '../flashsales/flashsales.service';
import { ItemFlashsalesService } from '../item-flashsales/item-flashsales.service';
import { ProductService } from '../product/product.service';
import { SendmailService } from '../sendmail/sendmail.service';

@Injectable()
export class CronjobService {
  private readonly logger = new Logger(CronjobService.name);
  constructor(
    private productService: ProductService,
    private flashsalesService: FlashsalesService,
    private sendMailService: SendmailService,
  ) {}

  @Cron('* * * * *', {
    name: 'checkIsSaleItems',
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async checkIsSaleItems() {
    const product = await this.productService.productRepository.find();
    // lặp qua từng product và kiểm tra
    // nếu như đang trong chương trình sale thì update status is_sale thành true
    const product_sale = await product.map(async (product) => {
      const result = await this.productService.getItemWithFlashsale(product.id);
      if (result) {
        await this.productService.updateIsSaleTrue(product.id);
      } else {
        await this.productService.updateIsSaleFalse(product.id);
      }
    });
    await Promise.all(product_sale);
  }

  @Cron('* * * * *', {
    name: 'checkIsSaleItems',
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async sendNotificationBeforeSale() {
    try {
      const timeNow = new Date().setSeconds(0, 0);
      const flashsales =
        await this.flashsalesService.flashsalerepository.find();
      await flashsales.map(async (flashsale) => {
        const startSaleBefore15min = new Date(
          new Date(flashsale.startSale).getTime() - 15 * 60 * 1000,
        ).getTime();
        if (timeNow === startSaleBefore15min) {
          await this.sendMailService.sendNotification(flashsale);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
