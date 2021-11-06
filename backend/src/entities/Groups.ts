import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import DateColumn from './DateColumn';
import { GroupCategories } from './GroupCategories';
import { GroupMembers } from './GroupMembers';

@ApiTags('GROUPS')
@Entity('groups', { schema: 'yju' })
export class Groups extends DateColumn {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: '그룹 번호',
  })
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '그룹1',
    description: '그룹 이름',
  })
  @Column({ type: 'varchar', length: 20 })
  name: string;

  @IsString()
  @ApiProperty({
    example: '저희는 *** 입니다. ~',
    description: '그룹 정보',
  })
  @IsOptional()
  @Column({ type: 'varchar', nullable: true })
  info: string | null;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: '소개팅',
  })
  @Column({ type: 'tinyint', unsigned: true, nullable: true })
  categoryId: number | null;

  @ManyToOne(() => GroupCategories, (category) => category.Groups, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  GroupType: GroupCategories;

  @OneToMany(() => GroupMembers, (groupmembers) => groupmembers.Group)
  GroupMembers: GroupMembers[];
}
