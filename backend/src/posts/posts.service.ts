import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/entities/Posts';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
  ) {}

  //전체 게시판
  async findAll(take: number, skip: number) {
    return this.pagination(take, skip);
  }

  //카테고리 별 게시판
  async findPostsByCategoryId(categoryId: number, take: number, skip: number) {
    return this.paginationByCategoryId(categoryId, take, skip);
  }

  async pagination(take: number, skip: number) {
    const posts = await this.postsRepository
      .createQueryBuilder('posts')
      .select(
        'posts.id, posts.title, posts.content, posts.status, posts.categoryId, posts.userId, posts.categoryId, posts.createdAt, posts.updatedAt, posts.deletedAt , COUNT(*) AS commentCount',
      )
      .leftJoin('posts.PostComments', 'c')
      .where('posts.status = :status', { status: 1 })
      .groupBy('posts.id')
      .orderBy('created_at', 'ASC')
      .take(take)
      .skip(skip)
      .getRawMany();
    return posts;
  }
  async paginationByCategoryId(categoryId: number, take: number, skip: number) {
    const posts = await this.postsRepository
      .createQueryBuilder('posts')
      .select(
        'posts.id, posts.title, posts.content, posts.status, posts.categoryId, posts.userId, posts.categoryId, posts.createdAt, posts.updatedAt, posts.deletedAt , COUNT(*) AS commentCount',
      )
      .leftJoin('posts.PostComments', 'c')
      .where('posts.category_id = :categoryId', { categoryId })
      .andWhere('posts.status = :status', { status: 1 })
      .groupBy('posts.id')
      .orderBy('created_at', 'ASC')
      .skip(skip)
      .take(take)
      .getRawMany();
    return posts;
  }
}
