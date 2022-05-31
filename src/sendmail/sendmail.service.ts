import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SendmailService {
  constructor(private readonly mailerService: MailerService) {}
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
}
