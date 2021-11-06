import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentLike } from 'src/entities/CommentLike';
import { Comments } from 'src/entities/Comments';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentsController } from './comments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comments, CommentLike])],
  controllers: [CommentController, CommentsController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentsModule {}
