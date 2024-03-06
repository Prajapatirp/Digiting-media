import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'digiting_media',
      synchronize: true,
      autoLoadModels: true,
      models: [], // Your Sequelize models can go here
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
