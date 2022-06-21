import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsArray, IsNumber } from 'class-validator';

export class OrderDetailItem {
  @IsString()
  @ApiProperty({ type: 'string' })
  product_id?: string;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  quantity?: number;
}
export class CreateOrderDto {
  @IsString()
  @ApiProperty({ type: 'string' })
  full_name?: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  address?: string;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  phone_number?: number;

  @IsString()
  @ApiProperty({ type: 'string' })
  description?: string;

  @ApiProperty()
  voucher_id?: string;

  @IsArray()
  @ApiProperty({ type: [OrderDetailItem] })
  order_details?: OrderDetailItem[];
}
