import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SendmailModule } from './sendmail/sendmail.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './authorization/roles.guard';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '6246233',
      database: 'Project-nestjs',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MulterModule.register({
      dest: './files',
    }),
    UserModule,
    AuthModule,
    SendmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
