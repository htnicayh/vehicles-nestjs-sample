import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/users.entity';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [(TypeOrmModule.forFeature([UserEntity]))],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService, AuthService]
})
export class UsersModule {}
