import { FlashSalesRepository } from './flashsales.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ItemFlashsalesService } from 'src/item-flashsales/item-flashsales.service';
import { CreateFlashsaleDto } from './dto/create-flashsale.dto';
import { UpdateFlashsaleDto } from './dto/update-flashsale.dto';
import { getConnection } from 'typeorm';
const dateNow = new Date();
@Injectable()
export class FlashsalesService {
  constructor(
    public flashsalerepository: FlashSalesRepository,
    private readonly itemFlashsalesService: ItemFlashsalesService,
  ) {}
  async create(createFlashsaleDto: CreateFlashsaleDto) {
    try {
      const { description, name, startSale, endSale, flashSaleItem } =
        createFlashsaleDto;
      const start = new Date(startSale);
      const end = new Date(endSale);
      if (start.getTime() < dateNow.getTime())
        return {
          code: 404,
          message: 'Thời gian bắt đầu không được nhỏ hơn hiện tại',
        };
      if (end.getTime() < start.getTime())
        return {
          code: 404,
          message: 'Thời gian kết thúc không được nhỏ hơn thời gian bắt đầu',
        };
      const checkDate = await getConnection()
        .createQueryBuilder('flashsale', 'fl')
        .where(
          '(fl.startSale <= :startSale AND (fl.endSale BETWEEN :startSale AND :endSale))',
          {
            startSale,
            endSale,
          },
        )
        .orWhere(
          '((fl.startSale BETWEEN :startSale AND :endSale) AND fl.endSale >= :endSale)',
          {
            startSale,
            endSale,
          },
        )
        .orWhere('(fl.startSale <= :startSale AND  fl.endSale >= :endSale)', {
          startSale,
          endSale,
        })
        .orWhere('(fl.startSale >= :startSale AND  fl.endSale <= :endSale)', {
          startSale,
          endSale,
        })
        .getMany();
      if (checkDate.length > 0) {
        return {
          code: 404,
          message: 'Không thể đặt flashsale vì trùng thời gian',
        };
      }
      const flashsale = await this.flashsalerepository.create({
        description,
        name,
        startSale,
        endSale,
      });
      const result = await this.flashsalerepository.save(flashsale);
      if (result) {
        const itemFlashSale = flashSaleItem.map((flI) => {
          return this.itemFlashsalesService.create(flI, flashsale);
        });
        await Promise.all(itemFlashSale)
          .then(() => {
            return { code: 200, message: 'Create flashsale success' };
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }

  findAll() {
    return `This action returns all flashsales`;
  }

  findOne(id: string) {
    return `This action returns a #${id} flashsale`;
  }

  update(id: string, updateFlashsaleDto: UpdateFlashsaleDto) {
    return `This action updates a #${id} flashsale`;
  }

  remove(id: string) {
    return `This action removes a #${id} flashsale`;
  }
}
