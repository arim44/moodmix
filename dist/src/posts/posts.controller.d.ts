import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { type AuthUser } from '../common/current-user.decorator';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto, user: AuthUser): Promise<{
        id: number;
        title: string;
        message: string;
    }>;
    addImage(id: number, file: Express.Multer.File, user: AuthUser): Promise<{
        id: number;
        imageUrl: string | null;
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
    update(id: number, updatePostDto: UpdatePostDto, user: AuthUser): Promise<{
        message: string;
        postId: number;
    }>;
    remove(id: number, user: AuthUser): Promise<{
        message: string;
        postId: number;
    }>;
}
