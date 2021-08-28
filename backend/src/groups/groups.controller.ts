import {
  Body,
  Controller,
  Delete,
  Get,
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
import { Groups } from 'src/entities/Groups';
import { RequestGroupDto } from './dto/request.group.dto';
import { ResponseGroupDto } from './dto/response.group.dto';
import { GroupsService } from './groups.service';
import { GroupLeaderGuard } from './guards/group.leader.guard';
import { GroupMemberGuard } from './guards/group.member.guard';
import { NotGroupLeaderGuard } from './guards/not.group.leader.guard';

@ApiBearerAuth()
@ApiTags('GROUPS')
@UseGuards(JwtAuthGuard)
@Controller('api/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiResponse({
    status: 200,
    description: '그룹 찾기 성공',
    type: [ResponseGroupDto],
  })
  @ApiOperation({ summary: '내 그룹 찾기' })
  @Get()
  async findUserGroups(@User() user: UserDto) {
    return this.groupsService.findGroupsByUser(user.id);
  }

  @ApiResponse({
    status: 200,
    description: '특정 그룹 찾기 성공',
    type: [ResponseGroupDto],
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: '그룹 번호',
  })
  @ApiOperation({ summary: '내가 가입한 특정 그룹 정보' })
  @UseGuards(GroupMemberGuard)
  @Get(':groupId')
  async findGroup(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.groupsService.findGroup(groupId);
  }

  @ApiResponse({
    status: 201,
    description: '그룹 생성 성공',
    type: [ResponseGroupDto],
  })
  @ApiBody({
    description: '그룹 정보',
    type: RequestGroupDto,
  })
  @ApiOperation({ summary: '그룹 생성' })
  @Post()
  async createGroup(@Body() group: RequestGroupDto, @User() user: UserDto) {
    return await this.groupsService.createGroup(group, user.id);
  }

  @ApiParam({
    name: 'groupId',
    required: true,
    description: '그룹 번호',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: '초대할 유저 아이디',
  })
  @ApiResponse({
    status: 200,
    description: '그룹 초대 성공',
  })
  @ApiOperation({ summary: '그룹 초대' })
  @UseGuards(GroupLeaderGuard)
  @Patch(':groupId/invite/:userId')
  async inviteGroup(
    @Param('userId') userId: string,
    @Param('groupId', ParseIntPipe) groupId: number,
  ) {
    return this.groupsService.inviteGroup(groupId, userId);
  }

  @ApiParam({
    name: 'groupId',
    required: true,
    description: '그룹 번호',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: '그룹장 넘길 유저 아이디',
  })
  @ApiResponse({
    status: 200,
    description: '그룹장 넘기기 성공',
  })
  @ApiOperation({ summary: '그룹장 넘겨주기' })
  @UseGuards(GroupLeaderGuard)
  @Patch(':groupId/leader/:userId')
  async changeRole(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('userId') userId: string,
    @User() user: UserDto,
  ) {
    return this.groupsService.changeRole(groupId, userId, user.id);
  }

  @ApiResponse({
    status: 200,
    description: '그룹 삭제 성공',
    type: [ResponseGroupDto],
  })
  @ApiOperation({ summary: '그룹 삭제' })
  @UseGuards(GroupLeaderGuard)
  @Delete(':groupId')
  async removeGroup(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.groupsService.removeGroup(groupId);
  }

  @ApiResponse({
    status: 200,
    description: '그룹 탈퇴 성공',
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: '그룹 번호',
  })
  @ApiOperation({ summary: '그룹 탈퇴' })
  @UseGuards(NotGroupLeaderGuard)
  @Delete('leave/:groupId')
  async leaveGroup(
    @User() user: UserDto,
    @Param('groupId', ParseIntPipe) groupId: number,
  ) {
    return this.groupsService.leaveGroup(groupId, user.id);
  }

  @ApiResponse({
    status: 200,
    description: '그룹 추방 성공',
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: '그룹 번호',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: '추방할 유저 아이디',
  })
  @ApiOperation({ summary: '그룹에서 추방' })
  @UseGuards(GroupLeaderGuard)
  @Delete(':groupId/banish/:userId')
  async banishGroup(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('userId') userId: string,
  ) {
    return this.groupsService.banishGroup(groupId, userId);
  }
}
