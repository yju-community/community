import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostCategories } from './PostCategories';
import DateColumn from './DateColumn';
import { Users } from './Users';
import { PostReports } from './PostReports';
import { Images } from './Images';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PostLike } from './PostLike';
import { Comments } from './Comments';

@Entity('posts', { schema: 'yju' })
export class Posts extends DateColumn {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: '게시물 번호',
  })
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '안녕하세요 잘 부탁드립니다.',
    description: '게시물 제목',
  })
  @Column({ type: 'varchar', length: 50 })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '오늘은 API 문서 작성중~',
    description: '게시물 내용',
  })
  @Column({ type: 'text' })
  content: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example: '1',
    description: '게시물 상태(ex. 0: 모집 종료, 1: 모집 중)',
  })
  @Column({ type: 'tinyint', unsigned: true })
  status: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: '게시물 종류',
  })
  @Column({ type: 'tinyint', unsigned: true, nullable: true })
  categoryId: number | null;

  @IsString()
  @ApiProperty({
    example: '215125251251125123532',
    description: '유저 아이디(구글 유저 번호)',
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  userId: string | null;

  @ManyToOne(() => Users, (user) => user.Posts, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  User: Users;

  @ManyToOne(() => PostCategories, (postcategories) => postcategories.Posts, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn([
    {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  ])
  Category: PostCategories;

  @OneToMany(() => Comments, (comments) => comments.Post)
  Comments: Comments[];

  @OneToMany(() => PostLike, (postlike) => postlike.PostLiked)
  PostLikes: PostLike[];

  @OneToMany(() => PostReports, (postreports) => postreports.PostReported)
  PostReports: PostReports[];

  @OneToMany(() => Images, (images) => images.Post)
  Images: Images[];
}
