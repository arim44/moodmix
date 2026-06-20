import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { type AuthUser } from '../common/current-user.decorator';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    create(createFavoriteDto: CreateFavoriteDto, user: AuthUser): Promise<{
        createdAt: Date;
        id: number;
        user_id: number;
        cocktail_id: number;
    }>;
    findAll(user: AuthUser): import("@prisma/client").Prisma.PrismaPromise<({
        cocktail: {
            id: number;
            image_url: string | null;
            external_id: number | null;
            name_en: string;
            name_ko: string | null;
            category: string;
            alcoholic: string;
            glass: string;
            instruction_en: string;
            instruction_ko: string | null;
        };
    } & {
        createdAt: Date;
        id: number;
        user_id: number;
        cocktail_id: number;
    })[]>;
    findOne(id: string): string;
    update(id: string, updateFavoriteDto: UpdateFavoriteDto): string;
    remove(cocktailId: string, user: AuthUser): import("@prisma/client").Prisma.Prisma__FavoriteClient<{
        createdAt: Date;
        id: number;
        user_id: number;
        cocktail_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
