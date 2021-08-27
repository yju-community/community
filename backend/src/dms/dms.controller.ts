import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { DmsService } from './dms.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('DMS')
@Controller('api/rooms/:roomId/dms')
export class DmsController {
  constructor(private readonly dmsService: DmsService) {}

  @ApiOperation({ summary: '채팅 만들기 ' })
  @Post()
  async createDm() {
    return await this.dmsService.createDm();
  }

  @ApiOperation({ summary: '채팅 불러오기' })
  @Get(':id/chats')
  async getDmChats() {
    return await this.dmsService.getDmChats();
  }

  @ApiOperation({ summary: '채팅 생성하기' })
  @Post(':id/chats')
  async createDmChats() {
    return await this.dmsService.createDmChats();
  }

  @ApiOperation({ summary: '채팅 이미지 업로드하기' })
  @Post(':id/chats')
  async createDmImages() {
    return await this.dmsService.createDmImages();
  }

  @ApiOperation({ summary: '안 읽은 채팅 개수 불러오기' })
  @Post(':id/unreads')
  async getUnreads() {
    return await this.dmsService.getUnreads();
  }
}
