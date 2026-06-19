import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class CocktailsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCocktailDto: CreateCocktailDto): string;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        external_id: number | null;
        name_en: string;
        name_ko: string | null;
        image_url: string | null;
        category: string;
        alcoholic: string;
        glass: string;
        instruction_en: string;
        instruction_ko: string | null;
    }[]>;
    findOne(id: number): Promise<{
        ingredients: ({
            ingredient: {
                id: number;
                name_en: string;
                name_ko: string | null;
                image_url: string | null;
            };
        } & {
            id: number;
            cocktail_id: number;
            ingredient_id: number;
            measure: string | null;
        })[];
    } & {
        id: number;
        external_id: number | null;
        name_en: string;
        name_ko: string | null;
        image_url: string | null;
        category: string;
        alcoholic: string;
        glass: string;
        instruction_en: string;
        instruction_ko: string | null;
    }>;
    update(id: number, updateCocktailDto: UpdateCocktailDto): string;
    remove(id: number): string;
}
