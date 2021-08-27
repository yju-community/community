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
import { Posts } from './Posts';
import { ReportCategories } from './ReportCategories';
import { Users } from './Users';

@Entity('post_reports', { schema: 'yju' })
export class PostReports extends DateColumn {
  @ApiProperty({
    example: 1,
    description: '게시물 신고 번호',
  })
  @IsInt()
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @ApiProperty({
    example: '욕했어요',
    description: '신고 내용',
  })
  @IsString()
  @Column({ type: 'varchar' })
  content: string;

  @ApiProperty({
    example: 1,
    description: '신고 카테고리 번호',
  })
  @IsInt()
  @Column({ type: 'tinyint', unsigned: true, nullable: true })
  categoryId: number | null;

  @ApiProperty({
    example: '5215215141414',
    description: '신고한 유저',
  })
  @IsString()
  @Column({ type: 'varchar', length: 50, nullable: true })
  userId: string | null;

  @ApiProperty({
    example: '5215215141414',
    description: '신고 당한 게시물',
  })
  @IsInt()
  @Column({ type: 'int', unsigned: true, nullable: true })
  targetPostId: number | null;

  @ManyToOne(
    () => ReportCategories,
    (reportCategories) => reportCategories.PostReports,
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

  @ManyToOne(() => Users, (users) => users.PostReports, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  PostReporter: Users;

  @ManyToOne(() => Posts, (posts) => posts.PostReports, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'target_post_id', referencedColumnName: 'id' })
  PostReported: Posts;
}
