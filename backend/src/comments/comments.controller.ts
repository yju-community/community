import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';

@ApiTags('COMMENTS')
@Controller('api/post/:postId/comments')
export class CommentsController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({
    status: 200,
    description: '댓글 불러오기 성공',
  })
  @ApiParam({
    name: 'postId',
    required: true,
    description: '게시물 번호',
  })
  @ApiOperation({ summary: '게시물 댓글들 불러오기' })
  @Get()
  async findAllByPostId(@Param('postId', ParseIntPipe) postId: number) {
    return await this.commentService.findAllByPostId(postId);
  }
}
