import { CocktailsService } from './cocktails.service';
import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';
import { RecommendCocktailDto } from './recommend/dto/recommendCocktail.dto';
export declare class CocktailsController {
    private readonly cocktailsService;
    constructor(cocktailsService: CocktailsService);
    create(createCocktailDto: CreateCocktailDto): string;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
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
