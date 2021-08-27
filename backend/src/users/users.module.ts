import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisCacheModule } from 'src/cache/cache.module';
import { Comments } from 'src/entities/Comments';
import { Friends } from 'src/entities/Friends';
import { Posts } from 'src/entities/Posts';
import { UserReports } from 'src/entities/UserReport';
import { Users } from 'src/entities/Users';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Posts, Comments, Friends, UserReports]),
    RedisCacheModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
