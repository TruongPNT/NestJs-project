import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsInt, IsDate, IsEnum } from 'class-validator';
import { VoucherType } from '../entities/voucher.entity';

export class CreateVoucherDto {
  @IsString()
  @ApiProperty({ type: 'string' })
  code: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  note: string;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  discount: number;

  @IsEnum(VoucherType)
  @IsString()
  @ApiProperty({ enum: VoucherType })
  unit: VoucherType;

  @IsInt()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  quantity: number;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    type: 'string',
  })
  startTime: Date;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    type: 'string',
  })
  endTime: Date;
}
