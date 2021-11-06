import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Posts } from 'src/entities/Posts';
import { ResponsePostsDto } from './dto/response.posts.dto';
import { PostsService } from './posts.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('POSTS')
@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiResponse({
    status: 200,
    description: '성공',
    type: [ResponsePostsDto],
  })
  @ApiQuery({
    name: 'take',
    description: 'take: 몇개 가져올지(limit)',
  })
  @ApiQuery({
    name: 'skip',
    description: 'skip: 생략(offset)',
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
    type: [ResponsePostsDto],
  })
  @ApiQuery({
    name: 'category',
    description: 'category: 카테고리 번호',
  })
  @ApiQuery({
    name: 'take',
    description: 'take: 몇개 가져올지(limit)',
  })
  @ApiQuery({
    name: 'skip',
    description: 'skip: 생략(offset)',
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
