import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Posts } from 'src/entities/Posts';
import { PostsService } from './posts.service';

@ApiTags('POSTS')
@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiResponse({
    status: 200,
    description: '성공',
    type: [Posts],
  })
  @ApiOperation({ summary: '전체 게시물 가져오기' })
  @Get()
  async getPosts(
    @Query('take', ParseIntPipe) take: number,
    @Query('skip', ParseIntPipe) skip: number,
  ) {
    return await this.postsService.findAll(take, skip - 1);
  }

  @ApiResponse({
    status: 200,
    description: '성공',
    type: [Posts],
  })
  @ApiOperation({ summary: '카테고리 게시물 가져오기' })
  @Get('search')
  async getPostsByCategoryId(
    @Query('category', ParseIntPipe) categoryId: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('skip', ParseIntPipe) skip: number,
  ) {
    return await this.postsService.findPostsByCategoryId(
      categoryId,
      take,
      skip - 1,
    );
  }
}
