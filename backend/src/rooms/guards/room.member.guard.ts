import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomMembers } from 'src/entities/RoomMembers';
import { Rooms } from 'src/entities/Rooms';
import { Repository } from 'typeorm';

@Injectable()
export class NotGroupLeaderGuard implements CanActivate {
  constructor(
    @InjectRepository(RoomMembers)
    private roommembersRepository: Repository<RoomMembers>,
    @InjectRepository(Rooms)
    private roomRepository: Repository<Rooms>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const roomId = request.params.roomId;

    const room = await this.roomRepository.findOne({
      where: {
        id: roomId,
      },
    });

    if (!room) {
      throw new NotFoundException('채팅방이 존재하지 않습니다.');
    }

    const member = await this.roommembersRepository.findOne({
      userId: request.user.id,
      roomId,
    });
    if (!member) {
      throw new ForbiddenException('채팅방 멤버가 아닙니다.');
    }
    return true;
  }
}
