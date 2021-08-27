import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import DateColumn from './DateColumn';
import { Groups } from './Groups';
import { Users } from './Users';

@Entity('group_members', { schema: 'yju' })
export class GroupMembers extends DateColumn {
  @IsInt()
  @ApiProperty({
    example: 1,
    description: '그룹 번호',
  })
  @Column({ primary: true, type: 'int', unsigned: true })
  groupId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '1123412412412412',
    description: '멤버 아이디',
  })
  @Column({ primary: true, type: 'varchar', length: 50 })
  userId: string;

  @IsInt()
  @ApiProperty({
    example: '1',
    description: '1: 그룹장, 0: 그룹원',
  })
  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  role: number;

  @ManyToOne(() => Users, (users) => users.GroupMembers, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  Member: Users;

  @ManyToOne(() => Groups, (groups) => groups.GroupMembers, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'group_id', referencedColumnName: 'id' }])
  Group: Groups;
}
