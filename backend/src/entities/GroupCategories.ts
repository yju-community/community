import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Groups } from './Groups';

@Entity('group_categories', { schema: 'yju' })
export class GroupCategories {
  @IsInt()
  @ApiProperty({
    example: 1,
    description: '그룹 카테고리 번호',
  })
  @PrimaryGeneratedColumn({ type: 'tinyint', unsigned: true })
  id: number;

  @IsString()
  @ApiProperty({
    example: '소개팅',
    description: '소개팅, 스터디, 등등',
  })
  @Column({ type: 'varchar', length: 20 })
  name: string;

  @OneToMany(() => Groups, (groups) => groups.GroupType)
  Groups: Groups[];
}
