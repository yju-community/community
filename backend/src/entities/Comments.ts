import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentLike } from './CommentLike';
import { CommentReports } from './CommentReports';
import DateColumn from './DateColumn';
import { Posts } from './Posts';
import { Users } from './Users';

@Entity('comments', { schema: 'yju' })
export class Comments extends DateColumn {
  @IsInt()
  @ApiProperty({
    example: 1,
    description: '댓글 번호',
  })
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @IsString()
  @ApiProperty({
    example: '안녕하세요 잘 부탁드립니다.',
    description: '댓글 내용',
  })
  @Column({ type: 'text' })
  comment: string;

  @IsString()
  @ApiProperty({
    example: '215125251251125123532',
    description: '유저 아이디(구글 유저 번호)',
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  userId: string | null;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example: '1',
    description: '게시글 번호',
  })
  @Column({ type: 'int', unsigned: true, nullable: true })
  postId: number | null;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    example: '1',
    description: '부모 게시글 번호',
  })
  @Column({ type: 'int', unsigned: true, nullable: true })
  parentId?: number | null;

  @ManyToOne(() => Users, (users) => users.Comments, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  User: Users;

  @ManyToOne(() => Posts, (posts) => posts.Comments, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'post_id', referencedColumnName: 'id' }])
  Post: Posts;

  @ManyToOne(() => Comments, (comments) => comments.ChildComments, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'parent_id', referencedColumnName: 'id' }])
  ParentComment: Comments;

  @OneToMany(() => Comments, (comments) => comments.ParentComment)
  ChildComments: Comments[];

  @OneToMany(
    () => CommentReports,
    (commentreports) => commentreports.CommentReported,
  )
  CommentReports: CommentReports[];

  @OneToMany(() => CommentLike, (commentlike) => commentlike.CommentLiked)
  CommentLikes: CommentLike[];
}
