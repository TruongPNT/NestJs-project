import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';
export class CreateCategoryDto {
  @IsString()
  @ApiProperty({ type: 'string' })
  name?: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  banner?: Express.Multer.File;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  index?: number;
}
