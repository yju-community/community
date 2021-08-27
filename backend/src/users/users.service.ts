import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from 'src/cache/cache.service';
import { Comments } from 'src/entities/Comments';
import { Friends } from 'src/entities/Friends';
import { Posts } from 'src/entities/Posts';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { JoinRequestDto } from './dto/join.request.dto';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
    @InjectRepository(Friends) private friendsRepository: Repository<Friends>,
    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,
    private readonly cacheService: CacheService,
  ) {}

  async findOrCreate(joinRequestUser: JoinRequestDto): Promise<Users> {
    const exUser = await this.usersRepository.findOne({
      where: { id: joinRequestUser.id },
    });
    if (exUser) {
      return exUser;
    }
    return await this.usersRepository.save({
      id: joinRequestUser.id,
      email: joinRequestUser.email,
    });
  }
  async findOneById(id: string) {
    const exUser = await this.cacheService.get(`user:${id}`);
    if (exUser) {
      return exUser;
    }
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }
    await this.cacheService.set(`user:${id}`, user);
    return user;
  }

  async uploadProfile(id: string, profile: ProfileDto) {
    await this.usersRepository
      .createQueryBuilder()
      .update(Users)
      .set({
        nickname: profile.nickname,
        profileImage: profile.profileImage,
        gender: profile.gender,
        major: profile.major,
      })
      .where('id = :id', { id })
      .execute();
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    await this.cacheService.set(`user:${id}`, user);
    return user;
  }

  uploadImage(image: Express.Multer.File) {
    return image.filename;
  }

  async removeUser(id: string) {
    await this.usersRepository
      .createQueryBuilder()
      .delete()
      .from(Users)
      .where('id = :id', { id })
      .execute();
  }

  async findPostsByUserId(id: string) {
    const posts = await this.postsRepository.find({
      where: {
        userId: id,
      },
    });
    if (!posts) {
      throw new NotFoundException('게시물이 존재하지 않습니다.');
    }
    return posts;
  }
  async findCommentsByUserId(id: string) {
    const comments = await this.commentsRepository.find({
      where: {
        userId: id,
      },
    });
    if (!comments) {
      throw new NotFoundException('댓글이 존재하지 않습니다.');
    }
    return comments;
  }

  async acceptFriendRequest(userId: string, friendId: string) {
    const friend = await this.friendsRepository.findOne({
      where: {
        userId,
        friendId,
      },
    });
    if (friend) {
      throw new NotFoundException('이미 친구입니다.');
    }
    return this.friendsRepository.save({
      userId,
      friendId,
    });
  }

  async removeFriend(userId: string, friendId: string) {
    const friend = await this.friendsRepository.findOne({
      where: {
        userId,
        friendId,
      },
    });
    if (!friend) {
      throw new NotFoundException('친구가 아닙니다.');
    }
    return this.friendsRepository
      .createQueryBuilder()
      .delete()
      .from(Friends)
      .where('friends.user_id = :userId', { userId })
      .andWhere('friends.friend_id = :friendId', { friendId })
      .execute();
  }
}
