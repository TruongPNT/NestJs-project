import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
export class ForgetPasswordDto {
  @IsEmail()
  @ApiProperty({ type: 'string' })
  email: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  newPassword: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  otp: string;
}
