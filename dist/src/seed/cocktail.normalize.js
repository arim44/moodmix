"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeCocktail = normalizeCocktail;
function normalizeCocktail(data) {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = data[`strIngredient${i}`];
        const measure = data[`strMeasure${i}`];
        if (!ingredient)
            continue;
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
//# sourceMappingURL=cocktail.normalize.js.map