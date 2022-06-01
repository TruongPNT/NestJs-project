import { VoucherRepository } from './voucher.repository';
import { Injectable } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';

@Injectable()
export class VoucherService {
  constructor(private voucherRepository: VoucherRepository) {}
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
}
