import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @ApiProperty({ type: 'string' })
  full_name: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  address: string;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  phone_number: number;
}
