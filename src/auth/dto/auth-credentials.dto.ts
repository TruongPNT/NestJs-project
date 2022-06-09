import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsEmail,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  @ApiProperty({ type: 'string' })
  email: string;

  @IsString()
  // @MinLength(6)
  // @MaxLength(30)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Password is to weak',
  // })
  @ApiProperty({ type: 'string' })
  password: string;
}
