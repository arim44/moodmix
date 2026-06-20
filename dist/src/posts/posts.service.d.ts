import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class PostsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPostDto: CreatePostDto, userId: number): Promise<{
        id: number;
        title: string;
        message: string;
    }>;
    findAll(): Promise<{
        id: number;
        title: string;
        imageUrl: string | null;
        author: string;
        createdAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        title: string;
        content: string;
        imageUrl: string | null;
        author: {
            id: number;
            nickname: string;
        };
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updatePostDto: UpdatePostDto, userId: number): Promise<{
        message: string;
        postId: number;
    }>;
    remove(id: number, userId: number): Promise<{
        message: string;
        postId: number;
    }>;
    addImage(postId: number, userId: number, file: Express.Multer.File): Promise<{
        id: number;
        imageUrl: string | null;
    }>;
    private validateOwner;
}
