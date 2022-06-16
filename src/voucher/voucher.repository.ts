import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { Voucher } from './entities/voucher.entity';

const dateNow = new Date();

@EntityRepository(Voucher)
export class VoucherRepository extends Repository<Voucher> {
  async createVoucher(createVoucherDto: CreateVoucherDto) {
    try {
      const { startTime, endTime } = createVoucherDto;
      const start = new Date(startTime);
      const end = new Date(endTime);
      if (start.getTime() < dateNow.getTime())
        return {
          code: 404,
          message: 'Thời điểm bắt đầu không thể nhỏ hơn hiện tại',
        };

      if (end.getTime() < start.getTime())
        return {
          code: 404,
          message: 'Thời điểm kết thúc không thể nhỏ hơn thời điểm bắt đầu',
        };
      const voucher = await this.create({
        ...createVoucherDto,
      });
      await this.save(voucher);
      return { code: 200, message: 'Create voucher successful', voucher };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Sever error');
    }
  }
  async updateVoucher(id: string, updateVoucherDto: UpdateVoucherDto) {
    try {
      const voucher = await this.findOne(id);
      const { startTime, endTime } = updateVoucherDto;
      const start = new Date(startTime);
      const end = new Date(endTime);
      const voucherEndTime = new Date(voucher.endTime);
      const voucherStartTime = new Date(voucher.startTime);
      if (startTime && endTime) {
        if (start.getTime() < dateNow.getTime())
          throw new ConflictException(
            'Thời điểm bắt đầu không được nhỏ hơn hiện tại',
          );

        if (end.getTime() < start.getTime())
          throw new ConflictException(
            'Thời điểm kết thúc không được nhỏ hơn thời điểm bắt đầu',
          );
      }
      if (startTime && !endTime) {
        if (start.getTime() < dateNow.getTime())
          throw new ConflictException(
            'Thời điểm bắt đầu không được nhỏ hơn hiện tại',
          );
        if (start.getTime() > voucherEndTime.getTime())
          throw new ConflictException(
            'Thời điểm bắt đầu không được vượt quá thời điểm kết thúc',
          );
      }
      if (endTime && !startTime) {
        if (end.getTime() < dateNow.getTime())
          throw new ConflictException('Thời điểm kết thúc không hợp lệ');
        if (end.getTime() < voucherStartTime.getTime())
          throw new ConflictException(
            'Thời điểm kết thúc không được nhỏ hơn hiện tại',
          );
      }
      const result = await this.save({ ...voucher, ...updateVoucherDto });
      if (result) return { code: 200, message: 'Update voucher successful' };
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }
  async destroyVoucher(id: string) {
    try {
      const voucher = await this.findOne(id);
      if (!voucher) throw new NotFoundException('Voucher not found');
      const result = await this.softRemove(voucher);
      if (result) return { code: 200, message: 'voucher delete successful' };
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }
}
