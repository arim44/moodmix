import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
export declare class IngredientsController {
    private readonly ingredientsService;
    constructor(ingredientsService: IngredientsService);
    create(createIngredientDto: CreateIngredientDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateIngredientDto: UpdateIngredientDto): string;
    remove(id: string): string;
}
