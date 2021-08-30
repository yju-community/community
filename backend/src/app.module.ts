import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { GroupsModule } from './groups/groups.module';
import { CommentsModule } from './comments/comment.module';
import { PostsModule } from './posts/posts.module';
import { RoomsModule } from './rooms/rooms.module';
import { DmsModule } from './dms/dms.module';
import { EventsModule } from './events/events.module';
import { EventsGateway } from './events/events.gateway';
import { RedisCacheModule } from './cache/cache.module';
import * as ormconfig from '../ormconfig';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot(ormconfig),
    PostModule,
    GroupsModule,
    RoomsModule,
    DmsModule,
    EventsModule,
    RedisCacheModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule implements NestModule {
  configure(consumenr: MiddlewareConsumer): any {
    consumenr.apply(LoggerMiddleware).forRoutes('*');
  }
}
