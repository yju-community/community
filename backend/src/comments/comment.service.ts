import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentLike } from 'src/entities/CommentLike';
import { Comments } from 'src/entities/Comments';
import { Repository } from 'typeorm';
import { RequestCommentDto } from './dto/request.comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,
    @InjectRepository(CommentLike)
    private commentLikeRepository: Repository<CommentLike>,
  ) {}

  async findAllByPostId(postId: number) {
    const comments = this.commentsRepository.find({
      where: {
        postId,
      },
    });
    if (!comments) {
      throw new NotFoundException('댓글을 찾지 못했습니다.');
    }
    return comments;
  }

  async createComment(
    _comment: RequestCommentDto,
    postId: number,
    userId: string,
  ) {
    const comment = await this.commentsRepository
      .createQueryBuilder('comment')
      .insert()
      .into(Comments)
      .values({
        comment: _comment.comment,
        parentId: _comment.parentId,
        postId,
        userId,
      })
      .execute();

    return comment;
  }

  async updateComment(
    _comment: RequestCommentDto,
    commentId: number,
    userId: string,
  ) {
    const comment = await this.commentsRepository.findOne({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      throw new NotFoundException('댓글이 존재하지 않습니다.');
    }
    if (comment.userId !== userId) {
      throw new ForbiddenException('권한이 없습니다.');
    }
    comment.comment = _comment.comment;
    // comment.ParentCommentId = _comment.ParentCommentId;
    return await this.commentsRepository.save(comment);
  }

  async removeComment(postId: number, commentId: number, userId: string) {
    const comment = await this.commentsRepository.findOne({
      where: {
        id: commentId,
        postId,
      },
    });
    if (!comment) {
      throw new NotFoundException('댓글이 존재하지 않습니다.');
    }
    if (comment.userId !== userId) {
      throw new ForbiddenException('권한이 없습니다.');
    }
    return await this.commentsRepository.remove(comment);
  }

  async addLike(commentId: number, userId: string) {
    const like = await this.commentLikeRepository.findOne({
      where: {
        commentId,
        userId,
      },
    });
    if (like) {
      throw new NotFoundException('이미 좋아요를 누른 상태입니다.');
    }
    return await this.commentLikeRepository.save({
      userId,
      commentId,
    });
  }

  async removeLike(commentId: number, userId: string) {
    const like = await this.commentLikeRepository.findOne({
      where: {
        commentId,
        userId,
      },
    });
    if (!like) {
      throw new NotFoundException('좋아요를 누른 적이 없습니다.');
    }
    return await this.commentLikeRepository.remove(like);
  }
}
