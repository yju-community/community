import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Posts } from './Posts';

@Entity('post_categories', { schema: 'yju' })
export class PostCategories {
  @ApiProperty({
    example: 1,
    description: '게시물 카테고리 번호',
  })
  @IsInt()
  @PrimaryGeneratedColumn({ type: 'tinyint', unsigned: true })
  id: number;

  @ApiProperty({
    example: '소개팅',
    description: '카테고리 이름',
  })
  @IsString()
  @Column({ unique: true, type: 'varchar', length: 20 })
  name: string;

  @OneToMany(() => Posts, (posts) => posts.Category)
  Posts: Posts;
}
