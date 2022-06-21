import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';
export class CreateImgDetailDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  img_detail?: Express.Multer.File;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  index: number;

  @IsString()
  @ApiProperty({ type: 'string' })
  product_id: string;
}
