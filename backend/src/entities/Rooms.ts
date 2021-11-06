import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoomChats } from './RoomChats';
import { RoomMembers } from './RoomMembers';
import DateColumn from './DateColumn';
import { Dms } from './Dms';
import { Mentions } from './Mentions';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

@Entity('rooms', { schema: 'yju' })
export class Rooms extends DateColumn {
  @ApiProperty({
    example: 1,
    description: '채팅방 번호',
  })
  @IsInt()
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @ApiProperty({
    example: '2WDJ',
    description: '채팅방 이름',
  })
  @IsString()
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @OneToMany(() => RoomMembers, (roommembers) => roommembers.Room)
  RoomMembers: RoomMembers[];

  @OneToMany(() => RoomChats, (roomchats) => roomchats.Room)
  RoomChats: RoomChats[];

  @OneToMany(() => Dms, (dms) => dms.Room)
  Dms: Dms[];

  @OneToMany(() => Mentions, (mentions) => mentions.Room)
  Mentions: Mentions[];
}
