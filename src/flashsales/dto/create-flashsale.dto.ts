import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsDate, IsArray, IsNumber } from 'class-validator';

export class FlashSaleItem {
  @IsString()
  @ApiProperty({ type: 'string' })
  productId: string;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  quantity: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  discount: number;
}

export class CreateFlashsaleDto {
  @IsString()
  @ApiProperty({ type: 'string' })
  name?: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  description?: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: 'string' })
  startSale?: Date;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: 'string' })
  endSale?: Date;

  @IsArray()
  @ApiProperty({ type: [FlashSaleItem] })
  flashSaleItem?: FlashSaleItem[];
}
