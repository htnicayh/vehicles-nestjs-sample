import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PipeMiddleware } from '../middleware/pipe.middleware';
import SessionMiddleware from '../middleware/session.middleware';
import { ReportsModule } from '../reports/reports.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from '../users/entity/users.entity';
import { ReportEntity } from '../reports/entity/reports.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `environments/.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configure: ConfigService) => {
        return {
          type: 'sqlite',
          database: configure.get<string>('DB_NAME'),
          entities: [UserEntity, ReportEntity],
          synchronize: true
      }
      }
    }),
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
