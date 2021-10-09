import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/users/auth/auth.service';
import { UsersService } from 'src/users/users.service';
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
  providers: [AppService]
})
export class AppModule {}
