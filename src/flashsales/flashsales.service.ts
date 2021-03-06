import { FlashSalesRepository } from './flashsales.repository';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ItemFlashsalesService } from '../item-flashsales/item-flashsales.service';
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
        throw new ConflictException(
          'Thời gian bắt đầu không được nhỏ hơn hiện tại',
        );
      if (end.getTime() < start.getTime())
        throw new ConflictException(
          'Thời gian kết thúc không được nhỏ hơn thời gian bắt đầu',
        );
      const checkDate = await this.checkDate(startSale, endSale);
      if (!checkDate) {
        throw new ConflictException(
          'Không thể đặt flashsale vì trùng thời gian',
        );
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

        const createItemFlashSale = await Promise.all(itemFlashSale);
        if (createItemFlashSale) {
          return {
            code: 200,
            message: 'Create FlashSale successful',
            flashsale,
          };
        }
      }
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }

  findAll() {
    return this.flashsalerepository.find();
  }

  findOne(id: string) {
    return this.flashsalerepository.findOne({
      relations: ['itemFlashsale'],
      where: { id },
    });
  }

  async update(id: string, updateFlashsaleDto: UpdateFlashsaleDto) {
    const flashsale = await this.flashsalerepository.findOne(id);
    if (!flashsale) throw new NotFoundException('FlashSale not found');
    const { startSale, endSale } = updateFlashsaleDto;
    const start = new Date(startSale);
    const end = new Date(endSale);
    const flashsaleStartTime = new Date(flashsale.startSale);
    const flashsaleEndTime = new Date(flashsale.endSale);
    if (flashsaleStartTime.getTime() < dateNow.getTime())
      return {
        code: 404,
        message: 'Không thể update flash sale khi đã bắt đầu ',
      };
    if (startSale && !endSale) {
      if (start.getTime() < dateNow.getTime())
        throw new ConflictException(
          'Thời gian bắt đầu không được nhỏ hơn hiện tại',
        );
      const checkDate = await this.checkDate(start, flashsaleEndTime);
      if (checkDate) {
        await this.flashsalerepository.save({
          ...flashsale,
          ...updateFlashsaleDto,
        });
        return {
          code: 200,
          message: 'Update flashsale success',
        };
      }
    }

    if (endSale && !startSale) {
      if (end.getTime() < dateNow.getTime())
        throw new ConflictException(
          'Thời gian kết thúc không được nhỏ hơn thời gian hiện tại',
        );
      const checkDate = await this.checkDate(flashsaleStartTime, end);
      if (checkDate) {
        await this.flashsalerepository.save({
          ...flashsale,
          ...updateFlashsaleDto,
        });
        return {
          code: 200,
          message: 'Update flashsale success',
        };
      }
    }

    if (startSale && endSale) {
      if (end.getTime() < start.getTime())
        throw new ConflictException(
          'Thời gian kết thúc không được nhỏ hơn thời gian bắt đầu',
        );

      const checkDate = await this.checkDate(startSale, endSale);
      if (!checkDate) {
        throw new ConflictException(
          'Không thể đặt flashsale vì trùng thời gian',
        );
      }
    }
    await this.flashsalerepository.save({
      ...flashsale,
      ...updateFlashsaleDto,
    });
    return {
      code: 200,
      message: 'Update flashsale success',
    };
  }

  async remove(id: string) {
    try {
      const flashsale = await this.flashsalerepository.findOne(id);
      if (!flashsale) throw new NotFoundException('FlashSale not found');
      const flashSaleItems =
        await this.itemFlashsalesService.itemFlashsaleRepository.find({
          where: { flashsale },
        });
      await this.itemFlashsalesService.itemFlashsaleRepository.softRemove(
        flashSaleItems,
      );
      await this.flashsalerepository.softRemove(flashsale);
      return { code: 200, message: 'delete flashsale successful' };
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }

  async checkDate(startSale: Date, endSale: Date) {
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
      return false;
    } else {
      return true;
    }
  }
}
