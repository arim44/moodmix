import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUser } from '../common/current-user.decorator';
export declare class PostsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPostDto: CreatePostDto, userId: number): Promise<{
        title: string;
        content: string;
        image_url: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        user_id: number;
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
    update(id: number, updatePostDto: UpdatePostDto): string;
    remove(id: number): string;
    addImage(postId: number, user: AuthUser, file: Express.Multer.File): Promise<{
        title: string;
        content: string;
        image_url: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        user_id: number;
    }>;
}
