import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Package } from 'src/models/package.model';
import { JwtModule } from '@nestjs/jwt';
import { DbService } from 'src/libs/services/db.service';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from 'src/libs/services/auth/strategy/jwt.strategy';
import { AuthUser } from 'src/models/authUser.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Package, AuthUser]),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWTSecretKey || 'secretKey',
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [ServiceController],
  providers: [ServiceService, DbService, JwtStrategy],
})
export class ServiceModule {}
