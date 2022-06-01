import { Type } from 'class-transformer';
import { IsString, IsNumber, IsInt, IsDate, IsEnum } from 'class-validator';
import { VoucherType } from '../entities/voucher.entity';

export class CreateVoucherDto {
  @IsString()
  code: string;

  @IsString()
  note: string;

  @IsNumber()
  @Type(() => Number)
  discount: number;

  @IsEnum(VoucherType)
  @IsString()
  unit: VoucherType;

  @IsInt()
  @Type(() => Number)
  quantity: number;

  @IsDate()
  @Type(() => Date)
  startTime: Date;

  @Type(() => Date)
  @IsDate()
  endTime: Date;
}
