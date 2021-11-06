import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupMembers } from 'src/entities/GroupMembers';
import { Groups } from 'src/entities/Groups';
import { Repository } from 'typeorm';

@Injectable()
export class NotGroupMemberGuard implements CanActivate {
  constructor(
    @InjectRepository(GroupMembers)
    private groupmembersRepository: Repository<GroupMembers>,
    @InjectRepository(Groups)
    private groupRepository: Repository<Groups>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const groupId = request.params.groupId;

    const group = await this.groupRepository.findOne({
      where: {
        id: groupId,
      },
    });

    if (!group) {
      throw new NotFoundException('그룹이 존재하지 않습니다.');
    }
    const member = await this.groupmembersRepository.findOne({
      userId: request.user.id,
      groupId,
    });
    if (member) {
      throw new ForbiddenException('그룹원입니다.');
    }
    return false;
  }
}
