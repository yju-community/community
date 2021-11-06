import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Blacklists } from './Blacklists';
import { RoomChats } from './RoomChats';
import { RoomMembers } from './RoomMembers';
import DateColumn from './DateColumn';
import { GroupMembers } from './GroupMembers';
import { Majors } from './Majors';
import { Posts } from './Posts';
import { PostReports } from './PostReports';
import { CommentReports } from './CommentReports';
import { UserReports } from './UserReport';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PostLike } from './PostLike';
import { CommentLike } from './CommentLike';
import { Comments } from './Comments';
import { Friends } from './Friends';
import { Dms } from './Dms';
import { Mentions } from './Mentions';

@Entity('users', { schema: 'yju' })
export class Users extends DateColumn {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '215125251251125123532',
    description: '유저 번호(구글 유저 번호)',
  })
  @Column({ primary: true, type: 'varchar', length: 50 })
  id: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'user@g.yju.ac.kr',
    description: '구글 gsuit 이메일(yju 학교 이메일)',
  })
  @Column({ unique: true, type: 'varchar', length: 50 })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'audwns',
    description: '유저 닉네임',
  })
  @Column({ type: 'varchar', length: 20, nullable: true })
  nickname: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Cat_image.jpg2021081212521_.jpg',
    description: '유저 프로필 사진',
  })
  @Column({ type: 'varchar', nullable: true })
  profileImage?: string | null;

  @IsString()
  @ApiProperty({
    example: 1,
    description: 'M: 남자, F: 여자',
  })
  @Column({ type: 'enum', nullable: true, enum: ['M', 'F'] })
  gender: 'M' | 'F';

  @IsInt()
  @ApiProperty({
    example: 1,
    description: '전공 번호',
  })
  @Column({ type: 'int', unsigned: true, nullable: true })
  major: number | null;

  @ManyToOne(() => Majors, (majors) => majors.Users, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'major', referencedColumnName: 'id' }])
  Major: Majors;

  @OneToMany(() => Posts, (posts) => posts.User)
  Posts: Posts[];

  @OneToMany(() => Comments, (comments) => comments.User)
  Comments: Comments[];

  @OneToMany(() => GroupMembers, (groupmembers) => groupmembers.Member)
  GroupMembers: GroupMembers[];

  @OneToMany(() => RoomMembers, (roommembers) => roommembers.User)
  RoomMembers: RoomMembers[];

  @OneToMany(() => RoomChats, (roomchats) => roomchats.User)
  RoomChats: RoomChats[];

  @OneToMany(() => PostReports, (postreports) => postreports.PostReporter)
  PostReports: PostReports[];

  @OneToMany(() => UserReports, (userreports) => userreports.UserReporter)
  UserReporters: UserReports[];

  @OneToMany(() => UserReports, (userreports) => userreports.UserReported)
  UsersReported: UserReports[];

  @OneToMany(() => PostLike, (postlike) => postlike.PostLiker)
  PostLikes: PostLike[];

  @OneToMany(() => CommentLike, (commentlike) => commentlike.CommentLiker)
  CommentLikes: CommentLike[];

  @OneToMany(
    () => CommentReports,
    (commentreports) => commentreports.CommentReporter,
  )
  CommentReports: PostReports[];

  @OneToMany(() => Blacklists, (blacklists) => blacklists.User)
  BlockRequireUsers: Blacklists[];

  @OneToMany(() => Blacklists, (blacklists) => blacklists.BlackUser)
  BlockedUsers: Blacklists[];

  @OneToMany(() => Friends, (friends) => friends.RequestedUser)
  RequestedFriends: Friends[];

  @OneToMany(() => Friends, (friends) => friends.ReceivedUser)
  ReceivedFriends: Friends[];

  @OneToMany(() => Dms, (dms) => dms.Sender)
  Dms: Dms[];

  @OneToMany(() => Dms, (dms) => dms.Receiver)
  Dms2: Dms[];

  @OneToMany(() => Mentions, (mentions) => mentions.Sender)
  Mentions: Mentions[];

  @OneToMany(() => Mentions, (mentions) => mentions.Receiver)
  Mentions2: Mentions[];
}
