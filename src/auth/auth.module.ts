import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.stategy';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { SendmailModule } from 'src/sendmail/sendmail.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({
      envFilePath: [`.env`],
    }),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
    }),
    UserModule,
    SendmailModule,
    NestjsFormDataModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
