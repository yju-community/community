import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comments } from './Comments';
import DateColumn from './DateColumn';
import { Posts } from './Posts';
import { ReportCategories } from './ReportCategories';
import { Users } from './Users';

@Entity('comment_reports', { schema: 'yju' })
export class CommentReports extends DateColumn {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'tinyint', unsigned: true, nullable: true })
  categoryId: number | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  userId: string | null;

  @Column({ type: 'int', unsigned: true, nullable: true })
  targetCommentId: number | null;

  @ManyToOne(
    () => ReportCategories,
    (reportCategories) => reportCategories.CommentReports,
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

  @ManyToOne(() => Users, (users) => users.CommentReports, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  CommentReporter: Users;

  @ManyToOne(() => Comments, (comments) => comments.CommentReports, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'target_comment_id', referencedColumnName: 'id' })
  CommentReported: Posts;
}
