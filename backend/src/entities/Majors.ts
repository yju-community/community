import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import DateColumn from './DateColumn';
import { Users } from './Users';

@Entity('majors', { schema: 'yju' })
export class Majors extends DateColumn {
  @ApiProperty({
    example: 1,
    description: '전공 번호',
  })
  @IsInt()
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @ApiProperty({
    example: '컴퓨터 전공 계열',
    description: '전공 이름',
  })
  @IsString()
  @Column({ unique: true, type: 'varchar', length: '20' })
  name: string;

  @OneToMany(() => Users, (users) => users.Major)
  Users: Users[];
}
