import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Rooms } from './Rooms';
import DateColumn from './DateColumn';
import { Users } from './Users';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

@Entity('room_memebrs', { schema: 'yju' })
export class RoomMembers extends DateColumn {
  @ApiProperty({
    example: 1,
    description: '채팅방 번호',
  })
  @IsInt()
  @Column({ primary: true, type: 'int', unsigned: true })
  roomId: number;

  @ApiProperty({
    example: '12342154215215',
    description: '채팅방 멤버',
  })
  @IsString()
  @Column({ primary: true, type: 'varchar', length: 50 })
  userId: string;

  @ManyToOne(() => Users, (users) => users.RoomMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  User: Users;

  @ManyToOne(() => Rooms, (rooms) => rooms.RoomMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'room_id', referencedColumnName: 'id' }])
  Room: Rooms;
}
