import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
export declare class IngredientsController {
    private readonly ingredientsService;
    constructor(ingredientsService: IngredientsService);
    create(createIngredientDto: CreateIngredientDto): string;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        image_url: string | null;
        name_en: string;
        name_ko: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        image_url: string | null;
        name_en: string;
        name_ko: string | null;
    }>;
    update(id: string, updateIngredientDto: UpdateIngredientDto): string;
    remove(id: string): string;
}
