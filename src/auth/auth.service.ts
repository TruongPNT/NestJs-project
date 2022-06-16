import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserService } from '../user/user.service';
import { SendmailService } from '../sendmail/sendmail.service';
import * as bcrypt from 'bcrypt';
import { ForgetPasswordDto } from './dto/forget-password.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private sendMailService: SendmailService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    try {
      const result = await this.userService.create(authCredentialsDto);
      if (result) {
        const userId = result.data.id;
        // tạo otp
        const otp = await this.generateOTP(userId);
        // send mail
        await this.sendMailService.sendVerifiedEmail(result.data.email, otp);
        return {
          code: 200,
          message: 'Đăng ký thành công, xin mời vào hòm thư để xác minh',
        };
      }
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Sever error');
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    try {
      const { email, password } = authCredentialsDto;
      const user = await this.userService.findOneByEmail(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        // nếu tài khoản chưa xác thực thì không cho đăng nhập
        if (user.isActive == false) {
          throw new UnauthorizedException(
            'Bạn cần phải xác minh tài khoản trước',
          );
        }
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
        throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
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
          expiresIn: '24h',
        });
        return {
          code: 200,
          message: 'Refresh token success',
          accessToken,
        };
      }
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new ForbiddenException('Mời bạn đăng nhập lại');
      }
      throw new BadRequestException('Sever error');
    }
  }

  async verifyEmail(email: string, OTP: string) {
    try {
      const user = await this.userService.findOneByEmail(email);
      if (user) {
        const result = await this.verifyOTP(user.id, OTP);
        if (result) {
          await this.userService.verifyEmail(email);
          return 'Verify email successful';
        }
      } else {
        throw new NotFoundException('Email not found');
      }
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }

  async verifyOTP(id: string, OTP: string) {
    const check = bcrypt.compare(id, OTP);
    return check;
  }

  async generateOTP(id: string) {
    const salt = await bcrypt.genSalt();
    const otp = bcrypt.hash(id, salt);
    return otp;
  }

  async requestForgetPassword(email: string) {
    try {
      const user = await this.userService.findOneByEmail(email);
      if (user) {
        const otp = await this.generateOTP(user.id);
        await this.sendMailService.sendForgetPassword(email, otp);
        return 'Send forget password succsess';
      } else {
        throw new NotFoundException('Không tìm thấy người dùng');
      }
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }

  async forgetPassword(forgetPasswordDto: ForgetPasswordDto) {
    try {
      const { email, newPassword, otp } = forgetPasswordDto;
      const user = await this.userService.findOneByEmail(email);
      if (!user) throw new NotFoundException('Không tìm thấy người dùng');
      const result = await this.verifyOTP(user.id, otp);
      if (result) {
        const updateP = await this.userService.updatePassword(
          email,
          newPassword,
        );
        if (updateP) {
          return 'Reset password successful';
        }
      }
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }
}
