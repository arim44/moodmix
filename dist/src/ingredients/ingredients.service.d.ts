import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
export declare class IngredientsService {
    create(createIngredientDto: CreateIngredientDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateIngredientDto: UpdateIngredientDto): string;
    remove(id: number): string;
}
