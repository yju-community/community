import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/common/dto/user.dto';
import { RequestPostDto } from './dto/request.post.dto';
import DateColumn from 'src/entities/DateColumn';
import { PostLike } from 'src/entities/PostLike';
import { Posts } from 'src/entities/Posts';

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

@ApiTags('POST')
@Controller('api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiResponse({
    status: 200,
    description: '게시물 가져오기',
    type: Posts,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '게시물 번호',
  })
  @ApiOperation({ summary: '특정 게시물 가져오기' })
  @Get(':id')
  async getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @ApiResponse({
    status: 201,
    description: '이미지 등록 성공',
    schema: {
      example: ['cat1628939852882.jpg', 'dog1628939852886.jpg'],
    },
  })
  @ApiBody({
    description: 'Formdata 이미지들',
    schema: {
      example: {
        images: ['cat.jpg', 'dog.jpg'],
      },
    },
  })
  @ApiOperation({ summary: '이미지들 저장' })
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: multer.diskStorage({
        destination(req, file, cb) {
          cb(null, 'uploads/');
        },
        filename(req, file, cb) {
          const ext = path.extname(file.originalname);
          cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    }),
  )
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('images')
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    return await this.postService.uploadImages(files);
  }

  @ApiResponse({
    status: 201,
    description: '게시물 등록 성공',
  })
  @ApiBody({
    description: '게시글 안 데이터',
    type: RequestPostDto,
  })
  @HttpCode(201)
  @ApiOperation({ summary: '게시물 등록' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() post: RequestPostDto, @User() user: UserDto) {
    return await this.postService.createPost(post, user.id);
  }

  @ApiResponse({
    status: 200,
    description: '게시물 수정 성공',
    type: Posts,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '게시물 번호',
  })
  @ApiOperation({ summary: '특정 게시물 수정' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() post: RequestPostDto,
    @User() user: UserDto,
  ) {
    return await this.postService.updatePost(post, id, user.id);
  }

  @ApiResponse({
    status: 200,
    description: '게시물 삭제 성공',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '게시물 번호',
  })
  @ApiOperation({ summary: '특정 게시물 삭제' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removePost(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.removePost(id);
  }

  @ApiResponse({
    status: 200,
    description: '게시물 좋아요 성공',
    type: PostLike,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '게시물 번호',
  })
  @ApiOperation({ summary: '게시물 좋아요 등록' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id/like')
  async addLike(@Param('id', ParseIntPipe) id: number, @User() user: UserDto) {
    return await this.postService.addLike(id, user.id);
  }

  @ApiResponse({
    status: 200,
    description: '게시물 좋아요 삭제',
    type: DateColumn,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '게시물 번호',
  })
  @ApiOperation({ summary: '게시물 좋아요 삭제' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id/like')
  async removeLike(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserDto,
  ) {
    return await this.postService.removeLike(id, user.id);
  }
}
