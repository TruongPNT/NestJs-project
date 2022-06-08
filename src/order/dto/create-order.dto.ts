import { Type } from 'class-transformer';
import { IsString, IsArray, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  full_name: string;

  @IsString()
  address: string;

  @IsNumber()
  @Type(() => Number)
  phone_number: number;

  @IsString()
  description: string;

  voucher_id?: string;

  @IsArray()
  order_details: OrderDetailItem[];
}

export class OrderDetailItem {
  @IsString()
  product_id: string;

  @IsNumber()
  @Type(() => Number)
  quantity: number;
}
