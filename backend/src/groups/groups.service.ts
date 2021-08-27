import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupMembers } from 'src/entities/GroupMembers';
import { Groups } from 'src/entities/Groups';
import { Connection, Repository } from 'typeorm';
import { RequestGroupDto } from './dto/request.group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Groups) private groupsRepository: Repository<Groups>,
    @InjectRepository(GroupMembers)
    private groupmembersRepository: Repository<GroupMembers>,
    private connection: Connection,
  ) {}

  async createGroup(_group: RequestGroupDto, userId: string) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const group = await this.groupsRepository
        .createQueryBuilder()
        .insert()
        .into(Groups)
        .values({
          name: _group.name,
          categoryId: _group.categoryId,
        })
        .execute();

      const groupId = group.identifiers[0].id;

      await this.groupmembersRepository
        .createQueryBuilder()
        .insert()
        .into(GroupMembers)
        .values({
          groupId,
          userId,
          role: 1,
        })
        .execute();

      await queryRunner.commitTransaction();

      return this.groupsRepository
        .createQueryBuilder('group')
        .leftJoinAndSelect('group.GroupMembers', 'GroupMembers')
        .where('group.id = :groupId', { groupId })
        .getOne();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }
  async removeGroup(groupId: number) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.groupsRepository
        .createQueryBuilder()
        .delete()
        .from(Groups)
        .where('id = :groupId', { groupId })
        .execute();
      await this.groupmembersRepository
        .createQueryBuilder('groupmembers')
        .delete()
        .from(GroupMembers)
        .where('groupmembers.groupId = :groupId', { groupId })
        .execute();

      await queryRunner.commitTransaction();
      return { message: '그룹 삭제 성공' };
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  async leaveGroup(groupId: number, userId: string) {
    return this.groupmembersRepository
      .createQueryBuilder()
      .delete()
      .from(GroupMembers)
      .where('groupId = :groupId', { groupId })
      .andWhere('userId = :userId', {
        userId,
      })
      .execute();
  }
  async findGroupsByUser(userId: string) {
    return this.groupsRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.GroupMembers', 'groupmember')
      .leftJoin('groupmember.Member', 'user')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('groupmember2.groupId')
          .from(GroupMembers, 'groupmember2')
          .where('groupmember2.userId = :userId', { userId })
          .getQuery();
        return 'group.id IN ' + subQuery;
      })
      .orderBy({
        'group.id': 'ASC',
        'groupmember.role': 'DESC',
        'groupmember.userId': 'ASC',
      })
      .getMany();
  }
  async findGroup(groupId: number) {
    return this.groupsRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.GroupMembers', 'groupmembers')
      .where('group.id = :groupId', { groupId })
      .orderBy({
        'groupmembers.userId': 'ASC',
      })
      .getMany();
  }
  async inviteGroup(groupId: number, groupMemberId: string) {
    await this.verifyCurrentMember(groupId, groupMemberId);
    return this.groupmembersRepository.save({
      groupId,
      userId: groupMemberId,
    });
  }
  async banishGroup(groupId: number, groupMemberId: string) {
    await this.verifyCurrentNotMember(groupId, groupMemberId);

    return this.groupmembersRepository
      .createQueryBuilder()
      .delete()
      .from(GroupMembers)
      .where('groupId = :groupId', { groupId })
      .andWhere('userId = :groupMemberId', {
        groupMemberId,
      })
      .execute();
  }
  async changeRole(groupId: number, groupMemberId: string, leaderId: string) {
    await this.verifyCurrentNotMember(groupId, groupMemberId);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.groupmembersRepository
        .createQueryBuilder('groupmembers')
        .update(GroupMembers)
        .set({ role: 1 })
        .where('group_members.group_id = :groupId', { groupId })
        .andWhere('group_members.user_id = :groupMemberId', {
          groupMemberId,
        })
        .execute();

      await this.groupmembersRepository
        .createQueryBuilder('groupmembers')
        .update(GroupMembers)
        .set({ role: 0 })
        .where('group_members.group_id = :groupId', { groupId })
        .andWhere('group_members.user_id = :leaderId', {
          leaderId,
        })
        .execute();

      await queryRunner.commitTransaction();
      return { message: 'change role success' };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  async verifyCurrentNotMember(groupId: number, groupMemberId: string) {
    const member = await this.groupmembersRepository.findOne({
      where: {
        groupId,
        userId: groupMemberId,
      },
    });
    if (!member) {
      throw new NotFoundException('그룹원이 아닙니다.');
    }
    return member;
  }

  async verifyCurrentMember(groupId: number, groupMemberId: string) {
    const member = await this.groupmembersRepository.findOne({
      where: {
        groupId,
        userId: groupMemberId,
      },
    });
    if (member) {
      throw new NotFoundException('이미 그룹원입니다.');
    }
    return member;
  }
}
