import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from 'src/entities/Images';
import { PostLike } from 'src/entities/PostLike';
import { Posts } from 'src/entities/Posts';
import { Connection, Repository } from 'typeorm';
import { RequestPostDto } from './dto/request.post.dto';
import { promisify } from 'util';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
    @InjectRepository(Images) private imagesRepository: Repository<Images>,
    @InjectRepository(PostLike)
    private postlikeRepository: Repository<PostLike>,
    private connection: Connection,
  ) {}

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });
    if (!post) {
      throw new NotFoundException('게시물이 존재하지 않습니다.');
    }
    return post;
  }

  async responsePost(id: number) {
    return await this.postsRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.Images', 'images')
      .leftJoinAndSelect('posts.PostLikes', 'like')
      .where('posts.id = :id', { id })
      .getOne();
  }

  async createPost(_post: RequestPostDto, userId: string) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const post = await this.postsRepository.save({
        title: _post.title,
        content: _post.content,
        categoryId: _post.categoryId,
        status: _post.status,
        userId,
      });
      await Promise.all(this.putImages(_post.images, post.id));

      await queryRunner.commitTransaction();
      return this.postsRepository
        .createQueryBuilder('posts')
        .leftJoinAndSelect('posts.Images', 'images')
        .where('posts.id = :id', { id: post.id })
        .getOne();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }
  putImages(images: Array<string>, postId: number) {
    return images.map(
      async (image) =>
        await this.imagesRepository.save(
          { name: image, postId },
          { reload: false },
        ),
    );
  }

  async updatePost(_post: RequestPostDto, id: number, userId: string) {
    const post = await this.findOne(id);
    if (post.userId !== userId) {
      throw new ForbiddenException('권한이 없습니다.');
    }
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      post.title = _post.title;
      post.content = _post.content;
      post.categoryId = _post.categoryId;
      post.status = _post.status;

      await this.postsRepository.createQueryBuilder().update(Posts).set({
        title: _post.title,
        content: _post.content,
        categoryId: _post.categoryId,
        status: _post.status,
      });

      if (_post.images) {
        await Promise.all([
          this.findAllImagesAndRemove(id),
          this.putImages(_post.images, id),
        ]);
      }

      await queryRunner.commitTransaction();

      return this.postsRepository
        .createQueryBuilder('posts')
        .leftJoinAndSelect('posts.Images', 'images')
        .leftJoinAndSelect('posts.Comments', 'Comments')
        .where('posts.id = :id', { id })
        .getOne();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  async findAllImagesAndRemove(postId: number) {
    return await this.imagesRepository
      .createQueryBuilder()
      .delete()
      .from(Images)
      .where('postId = :postId', { postId })
      .execute();
  }

  async removePost(id: number) {
    await this.findOne(id);
    return await this.postsRepository
      .createQueryBuilder()
      .delete()
      .from(Posts)
      .where('id = :id', { id })
      .execute();
  }

  async uploadImages(files: Express.Multer.File[]) {
    return files.map((file) => file.filename);
  }

  async addLike(id: number, userId: string) {
    // const getSismember = promisify(client.sismember).bind(client);
    // try {
    //   await getSismember(`postlike:${id}`, userId);
    //   client.SADD(`postlike:${id}`, userId);
    //   return { message: '좋아요 성공' };
    // } catch (err) {
    //   console.error(err);
    //   throw err;
    // }

    const like = await this.postlikeRepository.findOne({
      where: {
        postId: id,
        userId: userId,
      },
    });
    if (like) {
      throw new ForbiddenException('이미 이 게시글에 좋아요를 한 상태입니다.');
    }
    return await this.postlikeRepository.save({
      userId: userId,
      postId: id,
    });
  }
  async removeLike(id: number, userId: string) {
    // const getSismember = promisify(client.sismember).bind(client);
    // try {
    //   const isLiked = await getSismember(`postlike:${id}`, userId);
    //   if (!isLiked) {
    //     throw new ForbiddenException('좋아요를 누른 상태가 아닙니다.');
    //   }
    //   client.SREM(`postlike:${id}`, userId);
    //   return { message: '좋아요 취소' };
    // } catch (err) {
    //   console.error(err);
    //   throw err;
    // }
    const like = await this.postlikeRepository.findOne({
      where: {
        postId: id,
        userId: userId,
      },
    });
    if (!like) {
      throw new ForbiddenException('좋아요를 누른 상태가 아닙니다.');
    }
    return await this.postlikeRepository
      .createQueryBuilder()
      .delete()
      .from(PostLike)
      .where('userId = :userId', { userId })
      .andWhere('postId = :id', { id })
      .execute();
  }
}
