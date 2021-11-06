import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMembers } from 'src/entities/GroupMembers';
import { Groups } from 'src/entities/Groups';
import { Users } from 'src/entities/Users';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { GroupLeaderGuard } from './guards/group.leader.guard';
import { GroupMemberGuard } from './guards/group.member.guard';
import { NotGroupLeaderGuard } from './guards/not.group.leader.guard';
import { NotGroupMemberGuard } from './guards/not.group.member.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Groups, GroupMembers, Users])],
  controllers: [GroupsController],
  providers: [
    GroupsService,
    GroupMemberGuard,
    GroupLeaderGuard,
    NotGroupMemberGuard,
    NotGroupLeaderGuard,
  ],
  exports: [GroupsService],
})
export class GroupsModule {}
