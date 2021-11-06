import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import DateColumn from './DateColumn';
import { ReportCategories } from './ReportCategories';
import { Users } from './Users';

@Entity('user_reports', { schema: 'yju' })
export class UserReports extends DateColumn {
  @ApiProperty({
    example: 1,
    description: '신고 번호',
  })
  @IsInt()
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @ApiProperty({
    example: '욕했어요',
    description: '신고 내용',
  })
  @IsString()
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({
    example: 1,
    description: '신고 카테고리',
  })
  @IsInt()
  @Column({ type: 'tinyint', unsigned: true, nullable: true })
  categoryId: number | null;

  @ApiProperty({
    example: 112415152345223,
    description: '신고한 유저',
  })
  @IsString()
  @Column({ type: 'varchar', length: 50, nullable: true })
  userId: string | null;

  @ApiProperty({
    example: 112415152345223,
    description: '신고 당한 유저',
  })
  @IsString()
  @Column({ type: 'varchar', length: 50, nullable: true })
  targetUserId: string | null;

  @ManyToOne(
    () => ReportCategories,
    (reportCategories) => reportCategories.UserReports,
    {
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'id',
  })
  ReportCategory: ReportCategories;

  @ManyToOne(() => Users, (users) => users.UserReporters, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  UserReporter: Users;

  @ManyToOne(() => Users, (users) => users.UsersReported, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'target_user_id', referencedColumnName: 'id' })
  UserReported: Users;
}
