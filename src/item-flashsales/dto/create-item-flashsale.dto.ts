import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';
export class CreateItemFlashsaleDto {
  @IsNumber()
  @Type(() => Number)
  discount: number;

  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @IsString()
  productId?: string;
}
