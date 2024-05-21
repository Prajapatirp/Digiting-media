import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthUserModule } from './auth-user/auth-user.module';
import { AuthUser } from './models/authUser.model';
import { City } from './models/city.model';
import { State } from './models/state.model';
import { ServiceModule } from './service/service.module';
import { Package } from './models/package.model';
import { Otp } from './models/otp.model';
import { ContactUs } from './models/contactUs.model';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
      models: [
        AuthUser,
        City,
        State,
        Package,
        Otp,
        ContactUs,
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthUserModule,
    ServiceModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/public'),
    }),
    MulterModule.register({
      dest: '../public/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
