import { Module } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealController } from './deal.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Deal } from 'src/models/deal.model';
import { Package } from 'src/models/package.model';
import { AuthUser } from 'src/models/authUser.model';
import { JwtStrategy } from 'src/libs/services/auth/strategy/jwt.strategy';
import { DbService } from 'src/libs/services/db.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Deal, Package, AuthUser]),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWTSecretKey || 'secretKey',
      signOptions: { expiresIn: '12h' },
    }),
  ],  
  controllers: [DealController],
  providers: [DealService, DbService, JwtStrategy],
})
export class DealModule {}
