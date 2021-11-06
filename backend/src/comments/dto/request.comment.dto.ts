import { PickType } from '@nestjs/swagger';
import { Comments } from 'src/entities/Comments';

export class RequestCommentDto extends PickType(Comments, [
  'comment',
  'parentId',
]) {}
