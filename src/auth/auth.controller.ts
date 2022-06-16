import { Controller, Post, Body, UseFilters, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';

@Controller('auth')
@ApiTags('Authen')
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
  requestForgetPassword(@Query('email') email: string) {
    return this.authService.requestForgetPassword(email);
  }

  @Post('/forget-password')
  @FormDataRequest()
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetPasswordDto);
  }

  @Post('/refresh-token')
  @FormDataRequest()
  refreshToken(@Query('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
