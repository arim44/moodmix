import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { type AuthUser } from '../common/current-user.decorator';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto, user: AuthUser): Promise<{
        title: string;
        content: string;
        image_url: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        user_id: number;
    }>;
    addImage(id: number, file: Express.Multer.File, user: AuthUser): Promise<{
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
    update(id: string, updatePostDto: UpdatePostDto): string;
    remove(id: string): string;
}
