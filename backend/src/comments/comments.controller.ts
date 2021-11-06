import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Comments } from 'src/entities/Comments';
import { CommentService } from './comment.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('COMMENTS')
@Controller('api/post/:postId/comments')
export class CommentsController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({
    status: 200,
    description: '댓글 불러오기 성공',
    type: [Comments],
  })
  @ApiParam({
    name: 'postId',
    required: true,
    description: '게시물 번호',
  })
  @ApiQuery({
    name: 'take',
    description: 'take: 몇개 가져올지(limit)',
  })
  @ApiQuery({
    name: 'skip',
    description: 'skip: 생략(offset)',
  })
  @ApiOperation({
    summary:
      '게시물 댓글들 불러오기(parentId 가 null인 것들 자기가 곧 부모 댓글)',
  })
  @Get()
  async findAllByPostId(
    @Param('postId', ParseIntPipe) postId: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('skip', ParseIntPipe) skip: number,
  ) {
    return await this.commentService.findCommentsByPostId(
      postId,
      take,
      skip - 1,
    );
  }

  @ApiResponse({
    status: 200,
    description: '대댓글 불러오기 성공',
    type: [Comments],
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
  @ApiQuery({
    name: 'take',
    description: 'take: 몇개 가져올지(limit)',
  })
  @ApiQuery({
    name: 'skip',
    description: 'skip: 생략(offset)',
  })
  @ApiOperation({ summary: '대댓글 불러오기' })
  @Get(':commentId')
  async findNestedComments(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('skip', ParseIntPipe) skip: number,
  ) {
    return await this.commentService.findNestedComments(
      commentId,
      take,
      skip - 1,
    );
  }
}
