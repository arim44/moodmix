import { CocktailsService } from './cocktails.service';
import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';
import { RecommendCocktailDto } from './recommend/dto/recommendCocktail.dto';
export declare class CocktailsController {
    private readonly cocktailsService;
    constructor(cocktailsService: CocktailsService);
    create(createCocktailDto: CreateCocktailDto): string;
    findAll(): Promise<{
        id: number;
        name: string;
        image: string | null;
        category: string;
        alcoholic: string;
    }[]>;
    searcj(keyword: string): Promise<{
        id: number;
        name: string;
        image: string | null;
        alcoholic: string;
        category: string;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        name: string;
        image: string | null;
        category: string;
        alcoholic: string;
        glass: string;
        instruction: string;
        ingredients: {
            name: string;
            measure: string | null;
        }[];
    }>;
    recommend(dto: RecommendCocktailDto): Promise<{
        id: number;
        name: string;
        image: string | null;
        matchCount: number;
        totalCount: number;
        matchRate: number;
    }[]>;
    update(id: string, updateCocktailDto: UpdateCocktailDto): string;
    remove(id: string): string;
}
