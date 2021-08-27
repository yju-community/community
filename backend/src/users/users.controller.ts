import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
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
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/common/dto/user.dto';
import DateColumn from 'src/entities/DateColumn';
import { ProfileDto } from './dto/profile.dto';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { Posts } from 'src/entities/Posts';
import { Users } from 'src/entities/Users';
import { Comments } from 'src/entities/Comments';
import { Friends } from 'src/entities/Friends';

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}
@ApiTags('USERS')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    description: '나의 게시물들 가져오기 성공',
    type: [Posts],
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: '자신의 게시물 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get('posts')
  async getMyPosts(@User() user: UserDto) {
    return this.usersService.findPostsByUserId(user.id);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: '유저 번호',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: Users,
  })
  @ApiOperation({ summary: '유저 정보 가져오기' })
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @ApiResponse({
    status: 200,
    description: '게시물들 가져오기 성공',
    type: [Posts],
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '유저 번호',
  })
  @ApiOperation({ summary: '특정 유저 게시물 가져오기' })
  @Get(':id/posts')
  async getUserPosts(@Param('id') id: string) {
    return this.usersService.findPostsByUserId(id);
  }

  @ApiResponse({
    status: 200,
    description: '댓글들 가져오기 성공',
    type: [Comments],
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '유저 번호',
  })
  @ApiOperation({ summary: '특정 유저 댓글들 가져오기' })
  @Get(':id/comments')
  async getUserComments(@Param('id') id: string) {
    return this.usersService.findCommentsByUserId(id);
  }

  @ApiResponse({
    status: 201,
    description: '이미지 등록 성공',
    schema: {
      example: 'myface1628939852882.jpg',
    },
  })
  @ApiBody({
    description: 'Formdata 이미지',
    schema: {
      example: {
        images: 'myface.jpg',
      },
    },
  })
  @ApiOperation({ summary: '이미지 저장' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multer.diskStorage({
        destination(req, file, cb) {
          cb(null, 'uploads/');
        },
        filename(req, file, cb) {
          const ext = path.extname(file.originalname);
          cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('profile/image')
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.usersService.uploadImage(file);
  }

  @ApiResponse({
    status: 201,
    description: '프로필 등록 성공',
    type: Users,
  })
  @ApiOperation({ summary: '프로필 등록' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async uploadProfile(@User() user: UserDto, @Body() profile: ProfileDto) {
    return this.usersService.uploadProfile(user.id, profile);
  }

  @ApiResponse({
    status: 200,
    description: '친구 등록 성공',
    type: Friends,
  })
  @ApiParam({
    name: 'id',
    description: '친구 등록 아이디',
    required: true,
  })
  @ApiOperation({ summary: '친구 등록' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('friend/:id')
  async acceptFriendRequest(@Param('id') id: string, @User() user: UserDto) {
    return this.usersService.acceptFriendRequest(user.id, id);
  }

  @ApiResponse({
    status: 200,
    description: '탈퇴 성공',
    type: DateColumn,
  })
  @ApiOperation({ summary: '회원 탈퇴' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  async removeUser(@User() user: UserDto) {
    return this.usersService.removeUser(user.id);
  }

  @ApiResponse({
    status: 200,
    description: '친구 삭제 성공',
  })
  @ApiParam({
    name: 'id',
    description: '삭제할 유저 아이디',
    required: true,
  })
  @ApiOperation({ summary: '친구 삭제' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('friend/:id')
  async removeFriend(@Param('id') id: string, @User() user: UserDto) {
    return this.usersService.removeFriend(user.id, id);
  }
}
