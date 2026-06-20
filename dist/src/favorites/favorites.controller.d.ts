import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { type AuthUser } from '../common/current-user.decorator';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    create(createFavoriteDto: CreateFavoriteDto, user: AuthUser): Promise<{
        message: string;
        favoriteId: number;
    }>;
    findAll(user: AuthUser): Promise<{
        favoriteId: number;
        cocktailId: number;
        name: string;
        imageUrl: string | null;
        category: string;
        alcoholic: string;
        addedAt: Date;
    }[]>;
    findOne(id: string): string;
    update(id: string, updateFavoriteDto: UpdateFavoriteDto): string;
    remove(cocktailId: string, user: AuthUser): Promise<{
        message: string;
        cocktailId: number;
    }>;
}
