import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import DateColumn from './DateColumn';
import { Mentions } from './Mentions';
import { Rooms } from './Rooms';
import { Users } from './Users';

@Entity('room_chats', { schema: 'yju' })
export class RoomChats extends DateColumn {
  @ApiProperty({
    example: 1,
    description: '채팅 번호',
  })
  @IsInt()
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @ApiProperty({
    example: '안녕',
    description: '채팅 내용',
  })
  @IsString()
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({
    example: 1,
    description: '채팅방 번호',
  })
  @IsInt()
  @Column({ type: 'int', unsigned: true, nullable: true })
  roomId: number | null;

  @ApiProperty({
    example: '512521412412412',
    description: '채팅친 유저',
  })
  @IsString()
  @Column({ type: 'varchar', length: 50, nullable: true })
  userId: string | null;

  @ManyToOne(() => Rooms, (rooms) => rooms.RoomChats, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'room_id', referencedColumnName: 'id' }])
  Room: Rooms[];

  @ManyToOne(() => Users, (users) => users.RoomChats, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  User: Users[];

  @OneToMany(() => Mentions, (mentions) => mentions.Chat)
  Mentions: Mentions[];
}
