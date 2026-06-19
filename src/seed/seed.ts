// 칵테일 디비 적재

import { getCocktailsByLetter } from "./cocktaildb.client";
import { normalizeCocktail } from "./cocktail.normalize";
import { saveCocktail } from "./cocktail.seed.service";
import { prisma } from "../prisma/prisma.client";

async function main() {
  // 알파벳전체 분리
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  // 알파벳 수 만큼 반복
  for (const letter of alphabet) {
    console.log(`${letter} 조회중...`);
    // 알파벳별로 칵테일들 다 가져오기
    const drinks = await getCocktailsByLetter(letter);

    // 알파벳 하나의 drinks목록 각각 정규화하기
    for (const drink of drinks) {
      // 정규화
      const cocktail = normalizeCocktail(drink);

      // 디비에 저장
      await saveCocktail(cocktail);
    }
  }
  // 디비에 들어간 데이타 개수 로그
  console.log("Cocktail:", await prisma.cocktail.count());
  console.log("Ingredient:", await prisma.ingredient.count());
  console.log("CocktailIngredient:", await prisma.cocktailIngredient.count());
}
main()
  .catch((e) => {
    console.log(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

//npm run seed
