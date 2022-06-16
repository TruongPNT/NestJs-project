import { VoucherRepository } from './voucher.repository';
import { Injectable } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';

@Injectable()
export class VoucherService {
  constructor(public voucherRepository: VoucherRepository) {}
  create(createVoucherDto: CreateVoucherDto) {
    return this.voucherRepository.createVoucher(createVoucherDto);
  }

  findAll() {
    return this.voucherRepository.find();
  }

  findOne(id: string) {
    return this.voucherRepository.findOne(id);
  }

  update(id: string, updateVoucherDto: UpdateVoucherDto) {
    return this.voucherRepository.updateVoucher(id, updateVoucherDto);
  }

  remove(id: string) {
    return this.voucherRepository.destroyVoucher(id);
  }

  // async checkVoucherIsAvailable(id: string) {
  //   const dateNow = new Date().getTime();
  //   const voucher = await this.voucherRepository.findOne(id);
  //   if (!voucher) return { code: 404, message: 'Voucher not found' };
  //   const startTime = new Date(voucher.startTime).getTime();
  //   const endTime = new Date(voucher.endTime).getTime();
  //   if (voucher.quantity == 0)
  //     return { code: 404, message: 'voucher đã hết số lượng sử dụng' };
  //   if (dateNow < startTime || endTime < dateNow) {
  //     return {
  //       code: 404,
  //       message: 'thời hạn voucher đã kết thúc hoặc chưa diễn ra',
  //     };
  //   }
  //   if (voucher.status === false) {
  //     return { code: 404, message: 'Voucher không thể sử dụng lúc này' };
  //   }
  //   return voucher;
  // }
}
