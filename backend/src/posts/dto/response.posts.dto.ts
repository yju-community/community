import { ApiProperty } from '@nestjs/swagger';
import { Posts } from 'src/entities/Posts';

export class ResponsePostsDto extends Posts {
  @ApiProperty({
    example: '5',
    description: '이 게시물에 댓글이 5개 있다는 것',
  })
  count: number;
}
