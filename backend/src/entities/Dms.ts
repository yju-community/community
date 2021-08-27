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
import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('dms', { schema: 'yju' })
export class Dms extends DateColumn {
  @IsInt()
  @ApiProperty({
    example: 1,
    description: 'dm 번호',
  })
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @IsString()
  @ApiProperty({
    example: '122125215125',
    description: 'dm 보낸 유저',
  })
  @Column({ type: 'varchar', length: 50 })
  senderId: string;

  @IsString()
  @ApiProperty({
    example: '122125215125',
    description: 'dm 받는 유저',
  })
  @Column({ type: 'varchar', length: 50 })
  receiverId: string;

  @IsInt()
  @ApiProperty({
    example: 1,
    description: '채팅방 번호',
  })
  @Column({ type: 'int', unsigned: true })
  roomId: number;

  @IsString()
  @ApiProperty({
    example: '안녕 ***',
    description: 'dm 메세지 내용',
  })
  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Users, (users) => users.Dms, {
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
  @ManyToOne(() => Users, (users) => users.Dms2, {
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
  @ManyToOne(() => Rooms, (rooms) => rooms.Dms, {
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
