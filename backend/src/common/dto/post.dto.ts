import { PickType } from '@nestjs/swagger';
import { Posts } from 'src/entities/Posts';

export class PostDto extends PickType(Posts, [
  'id',
  'title',
  'content',
  'categoryId',
  'userId',
]) {}
