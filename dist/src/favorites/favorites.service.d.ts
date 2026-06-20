import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class FavoritesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: number, cocktailId: number): Promise<{
        createdAt: Date;
        id: number;
        user_id: number;
        cocktail_id: number;
    }>;
    findAll(userId: number): import("@prisma/client").Prisma.PrismaPromise<({
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
    findOne(id: number): string;
    update(id: number, updateFavoriteDto: UpdateFavoriteDto): string;
    remove(userId: number, cocktailId: number): import("@prisma/client").Prisma.Prisma__FavoriteClient<{
        createdAt: Date;
        id: number;
        user_id: number;
        cocktail_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
