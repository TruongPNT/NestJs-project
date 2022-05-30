import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';
export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @Type(() => Number)
  import_price: number;

  @IsNumber()
  @Type(() => Number)
  sell_price: number;

  @IsNumber()
  @Type(() => Number)
  quantity: number;

  product_img: Express.Multer.File;

  @IsString()
  description: string;
}
