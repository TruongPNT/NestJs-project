import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
  @IsString()
  @ApiProperty({ type: 'string' })
  name: string;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: Number })
  import_price: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: Number, required: false })
  sell_price: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: Number })
  quantity: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  product_img: Express.Multer.File;

  @IsString()
  @ApiProperty({ type: 'string' })
  description: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  categoryId: string;
}
