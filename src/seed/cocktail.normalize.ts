// 칵테일 데이타 정규화
import { CocktailDbDrink, CocktailIngredientData, CocktailSeedData} from "./cocktaildb.type";

export function normalizeCocktail(data: CocktailDbDrink): CocktailSeedData {
    // 재료 별 재료,양 나열하기
    const ingredients: CocktailIngredientData[] = [];

    for (let i = 1; i <= 15; i++) {
        // 재료
        const ingredient = data[`strIngredient${i}` as keyof CocktailDbDrink] as string | undefined;
        // 양
        const measure = data[`strMeasure${i}` as keyof CocktailDbDrink] as string | undefined;

        if (!ingredient) continue;

        ingredients.push({
            name: ingredient,
            measure: measure ?? "",
        });
    }
    return {
        externalId: Number(data.idDrink),
        name: data.strDrink,
        imageThumb: data.strDrinkThumb,
        category: data.strCategory,
        alcoholic: data.strAlcoholic,
        glass: data.strGlass,
        instruction_en: data.strInstructions,
        ingredients,
    };
}