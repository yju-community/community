import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Posts } from 'src/entities/Posts';

export class RequestPostDto extends PickType(Posts, [
  'title',
  'content',
  'categoryId',
  'status',
]) {
  @ApiProperty({
    example: ['cat.jpg', 'dog.jpg', 'person.jpg'],
    description: '이미지 이름',
  })
  @IsArray()
  images?: Array<string>;
}
