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

@Entity('images', { schema: 'yju' })
export class Images extends DateColumn {
  @ApiProperty({
    example: 'cat1252514813123123512.jpg',
    description: '이미지 번호',
  })
  @IsInt()
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @ApiProperty({
    example: ['cat.jpg', 'dog.jpg', 'person.jpg'],
    description: '이미지 이름',
  })
  @IsString()
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty({
    example: 1,
    description: '게시물 번호',
  })
  @IsInt()
  @Column({ type: 'int', unsigned: true })
  postId: number;

  @ManyToOne(() => Posts, (posts) => posts.Images, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  Post: Posts;
}
