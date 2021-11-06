import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Comments } from './Comments';
import DateColumn from './DateColumn';
import { Users } from './Users';

@Entity('comment_like', { schema: 'yju' })
export class CommentLike extends DateColumn {
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
  commentId: number;

  @ManyToOne(() => Users, (users) => users.CommentLikes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  CommentLiker: Users;

  @ManyToOne(() => Comments, (comments) => comments.CommentLikes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'comment_id', referencedColumnName: 'id' }])
  CommentLiked: Comments;
}
