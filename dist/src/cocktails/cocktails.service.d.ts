import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RecommendCocktailDto } from './recommend/dto/recommendCocktail.dto';
export declare class CocktailsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCocktailDto: CreateCocktailDto): string;
    findAll(): Promise<{
        id: number;
        name: string;
        image: string | null;
        category: string;
        alcoholic: string;
    }[]>;
    findOne(id: number): Promise<{
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
    update(id: number, updateCocktailDto: UpdateCocktailDto): string;
    remove(id: number): string;
    search(keyword: string): Promise<{
        id: number;
        name: string;
        image: string | null;
        alcoholic: string;
        category: string;
    }[]>;
    recommend(dto: RecommendCocktailDto): Promise<{
        id: number;
        name: string;
        image: string | null;
        matchCount: number;
        totalCount: number;
        matchRate: number;
    }[]>;
}
