"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cocktaildb_client_1 = require("./cocktaildb.client");
const cocktail_normalize_1 = require("./cocktail.normalize");
const cocktail_seed_service_1 = require("./cocktail.seed.service");
const prisma_client_1 = require("../prisma/prisma.client");
async function main() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    for (const letter of alphabet) {
        console.log(`${letter} 조회중...`);
        const drinks = await (0, cocktaildb_client_1.getCocktailsByLetter)(letter);
        for (const drink of drinks) {
            const cocktail = (0, cocktail_normalize_1.normalizeCocktail)(drink);
            await (0, cocktail_seed_service_1.saveCocktail)(cocktail);
        }
    }
    console.log("Cocktail:", await prisma_client_1.prisma.cocktail.count());
    console.log("Ingredient:", await prisma_client_1.prisma.ingredient.count());
    console.log("CocktailIngredient:", await prisma_client_1.prisma.cocktailIngredient.count());
}
main()
    .catch((e) => {
    console.log(e);
})
    .finally(async () => {
    await prisma_client_1.prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map