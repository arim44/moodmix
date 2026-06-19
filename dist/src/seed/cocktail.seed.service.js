"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCocktail = saveCocktail;
const prisma_client_1 = require("../prisma/prisma.client");
async function saveCocktail(cocktail) {
    console.log(`저장중: ${cocktail.name}`);
    const savedCocktail = await prisma_client_1.prisma.cocktail.upsert({
        where: { external_id: cocktail.externalId },
        update: {},
        create: {
            external_id: cocktail.externalId,
            name_en: cocktail.name,
            image_url: cocktail.imageThumb,
            category: cocktail.category,
            alcoholic: cocktail.alcoholic,
            glass: cocktail.glass,
            instruction_en: cocktail.instruction_en,
        }
    });
    console.log(`칵테일 seed 완료: ${savedCocktail.external_id}`);
    for (const ingredient of cocktail.ingredients) {
        const savedIngredient = await prisma_client_1.prisma.ingredient.upsert({
            where: { name_en: ingredient.name },
            update: {},
            create: {
                name_en: ingredient.name
            },
        });
        console.log(`재료 seed 완료: ${savedIngredient.name_en}`);
        await prisma_client_1.prisma.cocktailIngredient.upsert({
            where: {
                cocktail_id_ingredient_id: {
                    cocktail_id: savedCocktail.id,
                    ingredient_id: savedIngredient.id,
                },
            },
            update: { measure: ingredient.measure },
            create: {
                cocktail_id: savedCocktail.id,
                ingredient_id: savedIngredient.id,
                measure: ingredient.measure,
            },
        });
        console.log(`매핑 완료: ${savedCocktail.name_en} - ${savedIngredient.name_en}`);
    }
    console.log(`seed 완료: ${cocktail.name}`);
}
//# sourceMappingURL=cocktail.seed.service.js.map