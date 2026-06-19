import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class IngredientsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createIngredientDto: CreateIngredientDto): string;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        name_en: string;
        name_ko: string | null;
        image_url: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name_en: string;
        name_ko: string | null;
        image_url: string | null;
    }>;
    update(id: number, updateIngredientDto: UpdateIngredientDto): string;
    remove(id: number): string;
}
