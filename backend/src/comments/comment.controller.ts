import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/common/dto/user.dto';
import { CommentLike } from 'src/entities/CommentLike';
import DateColumn from 'src/entities/DateColumn';
import { CommentService } from './comment.service';
import { RequestCommentDto } from './dto/request.comment.dto';

@ApiTags('COMMENT')
@UseGuards(JwtAuthGuard)
@Controller('api/post/:postId/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({
    status: 201,
    description: '댓글 등록 성공',
  })
  @ApiBody({
    description: '댓글 정보',
    type: RequestCommentDto,
  })
  @ApiParam({
    name: 'postId',
    required: true,
    description: '게시물 번호',
  })
  @ApiOperation({ summary: '게시물 댓글 저장' })
  @ApiBearerAuth()
  @Post()
  async createComment(
    @Body() comment: RequestCommentDto,
    @Param('postId', ParseIntPipe) postId: number,
    @User() user: UserDto,
  ) {
    return await this.commentService.createComment(comment, postId, user.id);
  }

  @ApiResponse({
    status: 200,
    description: '댓글 수정 성공',
  })
  @ApiBody({
    description: '댓글 정보',
    type: RequestCommentDto,
  })
  @ApiParam({
    name: 'postId',
    required: true,
    description: '게시물 번호',
  })
  @ApiParam({
    name: 'commentId',
    required: true,
    description: '댓글 번호',
  })
  @ApiOperation({ summary: '게시물 특정 댓글 수정' })
  @ApiBearerAuth()
  @Patch(':commentId')
  async updateComment(
    @Body() comment: RequestCommentDto,
    @Param('commentId', ParseIntPipe) commentId: number,
    @User() user: UserDto,
  ) {
    return await this.commentService.updateComment(comment, commentId, user.id);
  }

  @ApiResponse({
    status: 200,
    description: '댓글 좋아요 성공',
    type: CommentLike,
  })
  @ApiParam({
    name: 'postId',
    required: true,
    description: '게시물 번호',
  })
  @ApiParam({
    name: 'commentId',
    required: true,
    description: '댓글 번호',
  })
  @ApiOperation({ summary: '댓글 좋아요 등록' })
  @ApiBearerAuth()
  @Patch(':commentId/like')
  async addLike(
    @Param('commentId', ParseIntPipe) commentId: number,
    @User() user: UserDto,
  ) {
    return await this.commentService.addLike(commentId, user.id);
  }

  @ApiResponse({
    status: 200,
    description: '댓글 좋아요 삭제',
    type: DateColumn,
  })
  @ApiParam({
    name: 'postId',
    required: true,
    description: '게시물 번호',
  })
  @ApiParam({
    name: 'commentId',
    required: true,
    description: '댓글 번호',
  })
  @ApiOperation({ summary: '댓글 좋아요 삭제' })
  @ApiBearerAuth()
  @Delete(':commentId/like')
  async removeLike(
    @Param('commentId', ParseIntPipe) commentId: number,
    @User() user: UserDto,
  ) {
    return await this.commentService.removeLike(commentId, user.id);
  }

  @ApiResponse({
    status: 200,
    description: '댓글 삭제 성공',
  })
  @ApiParam({
    name: 'postId',
    required: true,
    description: '게시물 번호',
  })
  @ApiParam({
    name: 'commentId',
    required: true,
    description: '댓글 번호',
  })
  @ApiOperation({ summary: '게시물 특정 댓글 삭제' })
  @ApiBearerAuth()
  @Delete(':commentId')
  async removeComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @User() user: UserDto,
  ) {
    return await this.commentService.removeComment(postId, commentId, user.id);
  }
}
