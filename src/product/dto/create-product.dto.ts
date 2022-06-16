import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
  @IsString()
  @ApiProperty({ type: 'string' })
  name: string;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  import_price?: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  sell_price?: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  quantity?: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  product_img?: Express.Multer.File;

  @IsString()
  @ApiProperty({ type: 'string', required: false })
  description?: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  categoryId?: string;
}
