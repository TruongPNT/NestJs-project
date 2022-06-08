import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';
export class CreateOrderDetailDto {
  @IsNumber()
  @Type(() => Number)
  quantity?: number;

  @IsString()
  product_id?: string;
}
