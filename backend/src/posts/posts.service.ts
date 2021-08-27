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
    return Promise.all([this.pagination(take, skip), this.countPosts()]);
  }

  //카테고리 별 게시판
  async findPostsByCategoryId(categoryId: number, take: number, skip: number) {
    return Promise.all([
      this.paginationByCategoryId(categoryId, take, skip),
      this.countPostsWithCategoryId(categoryId),
    ]);
  }

  async pagination(take: number, skip: number) {
    const posts = await this.postsRepository
      .createQueryBuilder('posts')
      .orderBy('created_at', 'DESC')
      .skip(skip)
      .take(take)
      .getMany();

    if (!posts) {
      throw new NotFoundException('게시물이 존재하지 않습니다.');
    }
    return posts;
  }
  async paginationByCategoryId(categoryId: number, take: number, skip: number) {
    const posts = await this.postsRepository
      .createQueryBuilder('posts')
      .where('posts.categoryId = :categoryId', { categoryId })
      .orderBy('created_at', 'DESC')
      .skip(skip)
      .take(take)
      .getMany();
    if (!posts) {
      throw new NotFoundException('게시물이 존재하지 않습니다.');
    }
    return posts;
  }

  async countPosts() {
    return this.postsRepository.createQueryBuilder('posts').getCount();
  }
  async countPostsWithCategoryId(categoryId: number) {
    return this.postsRepository
      .createQueryBuilder('posts')
      .where('posts.categoryId = :categoryId', { categoryId })
      .getCount();
  }
}
