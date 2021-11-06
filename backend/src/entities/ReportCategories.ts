import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentReports } from './CommentReports';
import { PostReports } from './PostReports';
import { UserReports } from './UserReport';

@Entity('report_categories', { schema: 'yju' })
export class ReportCategories {
  @ApiProperty({
    example: 1,
    description: '신고 카테고리 번호',
  })
  @IsInt()
  @PrimaryGeneratedColumn({ type: 'tinyint', unsigned: true })
  id: number;

  @ApiProperty({
    example: '욕설 비방',
    description: '신고 카테고리 이름',
  })
  @IsString()
  @Column({ unique: true, type: 'varchar', length: 20 })
  name: string;

  @OneToMany(() => PostReports, (postreports) => postreports.ReportCategory)
  PostReports: PostReports[];

  @OneToMany(
    () => CommentReports,
    (commentreports) => commentreports.ReportCategory,
  )
  CommentReports: PostReports[];

  @OneToMany(() => UserReports, (userreports) => userreports.ReportCategory)
  UserReports: PostReports[];
}
