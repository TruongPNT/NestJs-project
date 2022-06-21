import { VoucherRepository } from './voucher.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string) {
    const result = await this.voucherRepository.findOne(id);
    if (!result) throw new NotFoundException('Voucher not found');
    return result;
  }

  update(id: string, updateVoucherDto: UpdateVoucherDto) {
    return this.voucherRepository.updateVoucher(id, updateVoucherDto);
  }

  remove(id: string) {
    return this.voucherRepository.destroyVoucher(id);
  }
}
