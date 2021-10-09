import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PipeMiddleware } from '../middleware/pipe.middleware';
import SessionMiddleware from '../middleware/session.middleware';
import { ormConfig } from '../helper/config/configuration';
import { ReportsModule } from '../reports/reports.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true
    }),
    TypeOrmModule.forRoot(ormConfig),
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
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*')
  }
}
