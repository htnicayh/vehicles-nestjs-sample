import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PipeMiddleware } from '../middleware/pipe.middleware';
import { ReportsModule } from '../reports/reports.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from '../users/entity/users.entity';
import { ReportEntity } from '../reports/entity/reports.entity';

const cookieSession = require('cookie-session')

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `environments/.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot(),
    UsersModule, 
    ReportsModule],
  controllers: [AppController],
  providers: [  
    AppService,
    {
      provide: APP_PIPE,
      useValue: PipeMiddleware
    }
  ]
})
export class AppModule {
  constructor(
    private readonly configService: ConfigService
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      cookieSession({
        keys: [this.configService.get<String>('COOKIE_KEY')]
      })
    ).forRoutes('*')
  }
}
