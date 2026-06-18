import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
export declare class FavoritesService {
    create(createFavoriteDto: CreateFavoriteDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFavoriteDto: UpdateFavoriteDto): string;
    remove(id: number): string;
}
