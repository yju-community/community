import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RoomsService } from './rooms.service';

@ApiBearerAuth()
@ApiTags('ROOMS')
@UseGuards(JwtAuthGuard)
@Controller('api/rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @ApiOperation({ summary: '채팅방 유저들 가져오기' })
  @Get(':roomId/members')
  async getRoomMembers(@Param('roomId', ParseIntPipe) roomId) {
    return await this.roomsService.getRoomMembers(roomId);
  }

  @ApiOperation({ summary: '채팅방 채팅들 가져오기' })
  @Get(':roomId/chats')
  async getRoomChats(@Param('roomId', ParseIntPipe) roomId: number) {
    return await this.roomsService.getRoomChats(roomId);
  }
  @ApiOperation({ summary: '안 읽은 채팅 개수 가져오기' })
  @Get(':roomId/unreads')
  async getUnreads(@Param('roomId', ParseIntPipe) roomId: number) {
    return await this.roomsService.getUnreads(roomId);
  }

  @ApiOperation({ summary: '채팅방 생성하기 ' })
  @Post()
  async createRoom(@Body() room: any) {
    return await this.roomsService.createRoom(room);
  }

  @ApiOperation({ summary: '채팅방 유저 초대하기 ' })
  @Post(':roomId/members')
  async createRoomMembers(
    @Param('roomId', ParseIntPipe) roomId: number,
    @Body() roomMembers: any,
  ) {
    return await this.roomsService.createRoomMember(roomId, roomMembers);
  }

  @ApiOperation({ summary: '채팅방 채팅 생성하기 ' })
  @Post(':roomId/chats')
  async createRoomChats(@Param('roomId', ParseIntPipe) roomId: number) {
    return await this.roomsService.createRoomChats(roomId);
  }

  @ApiOperation({ summary: '채팅방 채팅 이미지 업로드하기 ' })
  @Post('/:roomId/images')
  async uploadChatImages(@Param('roomId', ParseIntPipe) roomId: number) {
    return await this.roomsService.uploadChatImages(roomId);
  }
}
