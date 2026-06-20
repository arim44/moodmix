import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class FavoritesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: number, cocktailId: number): Promise<{
        message: string;
        favoriteId: number;
    }>;
    findAll(userId: number): Promise<{
        favoriteId: number;
        cocktailId: number;
        name: string;
        imageUrl: string | null;
        category: string;
        alcoholic: string;
        addedAt: Date;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateFavoriteDto: UpdateFavoriteDto): string;
    remove(userId: number, cocktailId: number): Promise<{
        message: string;
        cocktailId: number;
    }>;
}
