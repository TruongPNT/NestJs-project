import { Type } from 'class-transformer';
import { IsString, IsDate, IsArray, IsNumber } from 'class-validator';

export class CreateFlashsaleDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  @Type(() => Date)
  startSale: Date;

  @IsDate()
  @Type(() => Date)
  endSale: Date;

  @IsArray()
  flashSaleItem: FlashSaleItem[];
}

export class FlashSaleItem {
  @IsString()
  productId: string;

  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @IsNumber()
  @Type(() => Number)
  discount: number;
}
