import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';
export class CreateItemFlashsaleDto {
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  discount: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  quantity: number;

  @IsString()
  @ApiProperty({ type: 'string' })
  productId?: string;
}
