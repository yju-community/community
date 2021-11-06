import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export default class DateColumn {
  @ApiProperty({
    example: '2021-08-13T22:03:46.590Z',
    description: '생성 일자',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2021-08-13T22:03:46.590Z',
    description: '변경 일자',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: '2021-08-13T22:03:46.590Z',
    description: '삭제 일자',
  })
  @DeleteDateColumn()
  deletedAt: Date | null;
}
