import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import DateColumn from './DateColumn';
import { Users } from './Users';

@Entity('friends', { schema: 'yju' })
export class Friends extends DateColumn {
  @IsString()
  @ApiProperty({
    example: '122125215125',
    description: '친구 신청한 유저 이름',
  })
  @Column({ primary: true, type: 'varchar', length: 50 })
  userId: string;

  @IsString()
  @ApiProperty({
    example: '122125215125',
    description: '친구 신청받는 유저 이름',
  })
  @Column({ primary: true, type: 'varchar', length: 50 })
  friendId: string;

  @ManyToOne(() => Users, (users) => users.RequestedFriends, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  RequestedUser: Users;

  @ManyToOne(() => Users, (users) => users.ReceivedFriends, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'friend_id', referencedColumnName: 'id' }])
  ReceivedUser: Users;
}
