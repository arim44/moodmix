// 칵테일 디비 저장
import { prisma } from "../prisma/prisma.client";
import { CocktailSeedData } from "./cocktaildb.type";

// 칵테일 하나 보냄
export async function saveCocktail(cocktail: CocktailSeedData) {
    console.log(`저장중: ${cocktail.name}`);
    // Cocktail 저장
    const savedCocktail = await prisma.cocktail.upsert({
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

    // Ingredient 저장
    // 재료들만큼 반복
    for (const ingredient of cocktail.ingredients) {
        const savedIngredient = await prisma.ingredient.upsert({
            where: { name_en: ingredient.name },
            update: {},
            create: {
                name_en: ingredient.name
            },
        });
        console.log(`재료 seed 완료: ${savedIngredient.name_en}`);

        // CocktailIngredient 저장
        await prisma.cocktailIngredient.upsert({
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

// // 칵테일 디비 적재
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
    
//     const cocktail = await prisma.cocktail.upsert({
//         where: { id: 1},    //cocktailId
//         create: {
//             name_en: "aaa",
//             name_ko : "홍길동",
//             image_url : "/uploads/ingredients",
//             category: "aaa",
//             alcoholic: "aaa",
//             glass: "dd",
//             instruction_en: "제조법"
//         },
//         update: {},
//     });
//     console.log(`seed 완료: ${cocktail.name_en}`);
// }