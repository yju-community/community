import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from 'src/comments/comment.module';
import { Images } from 'src/entities/Images';
import { PostLike } from 'src/entities/PostLike';
import { Posts } from 'src/entities/Posts';
import { PostsModule } from 'src/posts/posts.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Posts, Images, PostLike]),
    PostsModule,
    CommentsModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
