import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { JwtRefreshTokenStrategy } from './jwt-auth.refresh.strategy';
import { JwtAuthService } from './jwt-auth.service';
import { JwtAuthStrategy } from './jwt-auth.strategy';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([Users])],
  providers: [JwtAuthService, JwtAuthStrategy, JwtRefreshTokenStrategy],
  exports: [JwtModule, JwtAuthService],
})
export class JwtAuthModule {}
