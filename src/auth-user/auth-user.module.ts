import { Module } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AuthUserController } from './auth-user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthUser } from 'src/models/authUser.model';
import { JwtModule } from '@nestjs/jwt';
import { DbService } from 'src/libs/services/db.service';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { City } from 'src/models/city.model';
import { State } from 'src/models/state.model';
import { Otp } from 'src/models/otp.model';
import { Package } from 'src/models/package.model';
dotenv.config();

@Module({
  imports: [
    SequelizeModule.forFeature([
      AuthUser,
      City,
      State,
      Otp,
      Package,
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: `${process.env.JWTSecretKey}` || 'secretKey',
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthUserController],
  providers: [AuthUserService, DbService],
})
export class AuthUserModule {}
