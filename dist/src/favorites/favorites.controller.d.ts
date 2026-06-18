import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    create(createFavoriteDto: CreateFavoriteDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFavoriteDto: UpdateFavoriteDto): string;
    remove(id: string): string;
}
