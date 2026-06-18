import { CocktailsService } from './cocktails.service';
import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';
export declare class CocktailsController {
    private readonly cocktailsService;
    constructor(cocktailsService: CocktailsService);
    create(createCocktailDto: CreateCocktailDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCocktailDto: UpdateCocktailDto): string;
    remove(id: string): string;
}
