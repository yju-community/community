import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import DateColumn from './DateColumn';
import { Posts } from './Posts';
import { Users } from './Users';

@Entity('post_like', { schema: 'yju' })
export class PostLike extends DateColumn {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '215125251251125123532',
    description: '좋아요 누른 사람',
  })
  @Column({ primary: true, type: 'varchar', length: 50 })
  userId: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example: '1',
    description: '좋아요 눌린 게시물 번호',
  })
  @Column({ primary: true, type: 'int', unsigned: true })
  postId: number;

  @ManyToOne(() => Users, (users) => users.PostLikes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  PostLiker: Users;

  @ManyToOne(() => Posts, (posts) => posts.PostLikes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'post_id', referencedColumnName: 'id' }])
  PostLiked: Posts;
}
