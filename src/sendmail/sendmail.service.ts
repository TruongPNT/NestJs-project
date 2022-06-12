import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Flashsale } from 'src/flashsales/entities/flashsale.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SendmailService {
  constructor(
    public mailerService: MailerService,
    private userService: UserService,
  ) {}
  async sendVerifiedEmail(email: string, OTP: string) {
    this.mailerService
      .sendMail({
        to: `${email}`, // list of receivers
        from: 'truongpros17@gmail.com', // sender address
        subject: 'Verify your email', // Subject line
        text: 'Bạn hãy bấm vào ô verify bên dưới để xác thực tài khoản', // plaintext body
        html: `<a href="http://localhost:3000/auth/verify-email?email=${email}&otp=${OTP}">Verify</a>`,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async sendForgetPassword(email: string, OTP: string) {
    this.mailerService
      .sendMail({
        to: `${email}`, // list of receivers
        from: 'truongpros17@gmail.com', // sender address
        subject: 'Forget password', // Subject line
        text: `You want to reset your password. This is your OTP: ${OTP}\nPlease don't share this code for anyone.`,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async sendNotification(flashsale: Flashsale) {
    try {
      const users = await this.userService.usersRepository.find();
      const sendNotification = await users.map((user) => {
        this.mailerService.sendMail({
          to: `${user.email}`, // list of receivers
          from: 'truongpros17@gmail.com', // sender address
          subject: 'Flashsale notification', // Subject line
          text: `Welcome to flashsale: ${flashsale.name}.\n This flashsale start from: ${flashsale.startSale} to ${flashsale.endSale} `,
        });
      });
      await Promise.all(sendNotification);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
