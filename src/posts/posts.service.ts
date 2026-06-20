import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BASE_URL } from '../common/constants';
import {promises as fs} from 'fs';
import path from 'path';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) { };
 
  // 게시글 작성
  async create(createPostDto: CreatePostDto, userId: number) {
    const post = await this.prisma.post.create({
      data: {
        user_id: userId,
        title: createPostDto.title,
        content: createPostDto.content
      }
    });

    return {
      id: post.id,
      title: post.title,
      message: "게시글이 등록되었습니다."
    }
  }

  // 게시글 전체 조회
  async findAll() {
    const posts = await this.prisma.post.findMany({
      include: {
        user: {
          select: {
            //id: true,
            nickname: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      imageUrl: post.image_url ? `${BASE_URL}/uploads/${post.image_url}` : null,
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
    // 없는 게시글일 경우 예외처리
    if (!post) throw new NotFoundException(`게시글 ${id}를 찾을 수 없습니다.`);

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      imageUrl: post.image_url ? `${BASE_URL}/uploads/${post.image_url}` : null,
      author: {
        id: post.user.id,
        nickname: post.user.nickname,
      },
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }

  // 게시글 수정
  async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
    //await this.findOne(id);
    await this.validateOwner(id, userId);

    await this.prisma.post.update({
      where: { id },
      data: {
        title: updatePostDto.title,
        content: updatePostDto.content
      }
    });

    return { message: "게시글이 수정되었습니다.", postId: id };
  }

  // 게시글 삭제
  async remove(id: number, userId: number) {
    const post = await this.validateOwner(id, userId);

    //게시글 삭제시 첨부 이미지 있으면 삭제
    if(post.image_url)  {
      const filePath = path.join(
        process.cwd(),
        'uploads',
        post.image_url
      );

      try {
        await fs.unlink(filePath);
      }catch(error){
        console.warn('이미지 삭제 실패', error);
      }
    }

    // 삭제
    await this.prisma.post.delete({
      where: { id }
    });
    return { message: "게시글이 삭제되었습니다.", postId: id };
  }

  // 첨부파일 이미지
  async addImage(postId: number, userId: number, file: Express.Multer.File) {

    await this.validateOwner(postId, userId);

    const post = await this.prisma.post.update({
      where: { id: postId },
      data: {
        image_url: file.filename
      }
    });

    return {
      id: post.id,
      imageUrl: post.image_url ? `${BASE_URL}/uploads/${post.image_url}` : null
    };
  }

  /* 게시글 소유자 검증
  게시글 존재 여부 확인, 현재 로그인 사용자가 작성자 인지 확인
  (수정, 삭제, 이미지업로드)
  */
  private async validateOwner(postId: number, userId: number) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId }
    });
    // 게시글이 없으면 예외
    if (!post) throw new NotFoundException(`게시글 ${postId}를 찾을 수 없습니다.`);
    // 작성자가 아니면 예외
    if (post.user_id !== userId) throw new ForbiddenException("본인 게시글만 접근할 수 있습니다.");

    return post;
  }
}
