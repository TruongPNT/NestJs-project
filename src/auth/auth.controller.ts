import {
  Controller,
  Post,
  Body,
  UseFilters,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

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

  @Post('/refresh-token')
  @FormDataRequest()
  refreshToken(@Body() req) {
    const { refreshToken } = req;
    return this.authService.refreshToken(refreshToken);
  }
}
