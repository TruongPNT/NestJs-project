import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';
export class CreateImgDetailDto {
  img_detail: Express.Multer.File;

  @IsNumber()
  @Type(() => Number)
  index: number;

  @IsString()
  product_id: string;
}
