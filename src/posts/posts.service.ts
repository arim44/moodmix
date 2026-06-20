import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUser } from '../common/current-user.decorator';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) { };

  // 게시글 작성
  async create(createPostDto: CreatePostDto, userId: number) {
    return this.prisma.post.create({
      data: {
        user_id: userId,
        title: createPostDto.title,
        content: createPostDto.content
      }
    });
  }

  // 게시글 전체 조회
  async findAll() {
    const posts = await this.prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            nickname: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      imageUrl: post.image_url,
      author: post.user.nickname,
      createdAt: post.createdAt,
    }))
  }

  // 게시글 상세 조회
  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true, nickname: true
          }
        }
      }
    });
    if (!post) throw new NotFoundException(`게시글 ${id}를 찾을 수 없습니다.`);
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      imageUrl: post.image_url,
      author: {
        id: post.user.id,
        nickname: post.user.nickname,
      },
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  // 첨부파일 이미지
  async addImage(postId: number, user: AuthUser, file: Express.Multer.File) {
    return this.prisma.post.update({
      where: { id: postId },
      data: {
        image_url: file.filename
      }
    });
  }

}
