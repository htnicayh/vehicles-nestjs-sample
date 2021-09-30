import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from 'src/reports/entity/reports.entity';
import { UserEntity } from 'src/users/entity/users.entity';
import { ReportsModule } from '../reports/reports.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [UserEntity, ReportEntity],
    synchronize: true
  }),
  UsersModule, 
  ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
