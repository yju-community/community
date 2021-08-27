import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rooms } from './Rooms';
import DateColumn from './DateColumn';
import { Users } from './Users';
import { RoomChats } from './RoomChats';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

@Entity('mentions', { schema: 'yju' })
export class Mentions extends DateColumn {
  @ApiProperty({
    example: 1,
    description: '멘션 번호',
  })
  @IsInt()
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @ApiProperty({
    example: 1,
    description: '카테고리 번호',
  })
  @IsInt()
  @Column({ type: 'enum', enum: ['chat', 'dm', 'system'] })
  category: 'chat' | 'dm' | 'system';

  @ApiProperty({
    example: 1,
    description: '채팅 글 번호',
  })
  @IsInt()
  @Column({ type: 'int', unsigned: true })
  chatId: number;

  @ApiProperty({
    example: 1,
    description: '채팅방 번호',
  })
  @IsInt()
  @Column({ type: 'int', unsigned: true })
  roomId: number;

  @ApiProperty({
    example: '1252514813123123512',
    description: '보내는 사람 아이디',
  })
  @IsString()
  @Column({ type: 'varchar', length: 50 })
  senderId: string;

  @ApiProperty({
    example: '1252514813123123512',
    description: '받는 사람 아이디',
  })
  @IsString()
  @Column({ type: 'varchar', length: 50 })
  receiverId: string;

  @ManyToOne(() => RoomChats, (roomchats) => roomchats.Mentions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    {
      name: 'chat_id',
      referencedColumnName: 'id',
    },
  ])
  Chat: RoomChats;

  @ManyToOne(() => Users, (users) => users.Mentions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    {
      name: 'sender_id',
      referencedColumnName: 'id',
    },
  ])
  Sender: Users;

  @ManyToOne(() => Users, (users) => users.Mentions2, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    {
      name: 'receiver_id',
      referencedColumnName: 'id',
    },
  ])
  Receiver: Users;

  @ManyToOne(() => Rooms, (rooms) => rooms.Mentions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    {
      name: 'room_id',
      referencedColumnName: 'id',
    },
  ])
  Room: Rooms;
}
