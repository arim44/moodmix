import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';
export declare class CocktailsService {
    create(createCocktailDto: CreateCocktailDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCocktailDto: UpdateCocktailDto): string;
    remove(id: number): string;
}
