import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';
export class CreateCategoryDto {
  @IsString()
  name?: string;

  banner?: Express.Multer.File;

  @IsNumber()
  @Type(() => Number)
  index?: number;
}
