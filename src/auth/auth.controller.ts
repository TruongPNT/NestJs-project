import {
  Controller,
  Post,
  Body,
  UseFilters,
  UseGuards,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';

@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @FormDataRequest()
  signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/signup')
  @FormDataRequest()
  signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }

  @Get('/verify-email')
  verifyEmail(@Query('email') email: string, @Query('otp') otp: string) {
    return this.authService.verifyEmail(email, otp);
  }

  @Get('/request-forget-password')
  requestForgetPassword(@Body('email') email: string) {
    return this.authService.requestForgetPassword(email);
  }

  @Post('/forget-password')
  @FormDataRequest()
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetPasswordDto);
  }

  @Post('/refresh-token')
  @FormDataRequest()
  refreshToken(@Body() req) {
    const { refreshToken } = req;
    return this.authService.refreshToken(refreshToken);
  }
}
