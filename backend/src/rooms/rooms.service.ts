import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomMembers } from 'src/entities/RoomMembers';
import { Rooms } from 'src/entities/Rooms';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Rooms) private roomsRepository: Repository<Rooms>,
    @InjectRepository(RoomMembers)
    private roommembersRepository: Repository<RoomMembers>,
  ) {}

  async getRoomMembers(roomId: number) {
    const members = await this.roommembersRepository.find({
      where: {
        roomId,
      },
    });
  }
  async findOneByRoomId(roomId: number) {
    const room = await this.roomsRepository.findOne({
      where: { roomId },
    });
    if (!room) {
      throw new NotFoundException('존재하지 않는 채팅방입니다.');
    }
    return room;
  }
  async createRoom(_room: any) {
    // await this.roomsRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Rooms)
    //   .values({ roomName: _room.roomName })
    //   .execute();
    return await this.roomsRepository.save({
      name: _room.name,
    });
  }
  async createRoomMember(roomId: number, roomMembers: any) {
    await this.findOneByRoomId(roomId);
    return await this.roommembersRepository
      .createQueryBuilder()
      .insert()
      .into(RoomMembers)
      .values({ userId: roomMembers, roomId });
  }
  async createRoomChats(roomId: number) {
    return;
  }

  async uploadChatImages(roomId: number) {
    return;
  }
  async getUnreads(roomId: number) {
    return;
  }
  async getRoomChats(roomId: number) {
    return;
  }
}
