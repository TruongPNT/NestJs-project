import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  userRepository: any;
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    try {
      const result = await this.userService.create(authCredentialsDto);
      if (result.code === 200)
        return { code: result.code, message: 'Đăng ký thành công' };
      if (result.code === 404)
        return { code: result.code, message: 'Email đã tồn tại' };
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    try {
      const { email, password } = authCredentialsDto;
      const user = await this.userService.findOneByEmail(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        const payload: JwtPayload = { email };
        const accessToken = await this.jwtService.sign(payload, {
          expiresIn: '10m',
        });
        const refreshToken = await this.jwtService.sign(payload, {
          secret: process.env.REFRESH_TOKEN_SECRET,
          expiresIn: '10h',
        });
        return { message: 'Login successful', accessToken, refreshToken, user };
      } else {
        throw new UnauthorizedException('Wrong username or password!');
      }
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const result = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
      if (result) {
        const email = result.email;
        const payload: JwtPayload = { email };
        const accessToken = await this.jwtService.sign(payload, {
          expiresIn: '1h',
        });
        return {
          code: 200,
          message: 'Refresh token success',
          accessToken,
        };
      }
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return {
          code: 401,
          message: 'RefreshToken đã hết hạn, mời bạn đăng nhập lại',
        };
      }
      throw new BadRequestException('Sever error');
    }
  }
}
