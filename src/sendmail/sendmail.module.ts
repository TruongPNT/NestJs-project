import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendmailService } from './sendmail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        service: 'gmail',
        ignoreTLS: false,
        secure: false,
        auth: {
          user: 'truongpros17@gmail.com',
          pass: 'bsomiayimsnsqobg',
        },
      },
    }),
  ],
  providers: [SendmailService],
  exports: [SendmailService],
})
export class SendmailModule {}
