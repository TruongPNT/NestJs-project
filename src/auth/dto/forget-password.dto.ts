import { IsString, IsEmail } from 'class-validator';
export class ForgetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  newPassword: string;

  @IsString()
  otp: string;
}
