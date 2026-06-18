// 칵테일 디비 적재
import { PrismaClient } from "@prisma/client";
import { getCocktailsByLetter } from "../lib/cocktaildb.client";

const prisma = new PrismaClient();

async function main() {
  const drinks = await getCocktailsByLetter("a");

  console.log("개수:", drinks.length);

  console.log(
    drinks.map((d) => ({
      id: d.idDrink,
      name: d.strDrink,
    }))
  );
}

// async function main() { //alphaget: string
//     // a 테스트
//     const drinks = await getCocktailsByLetter("a");
//     console.log("개수", drinks.length);
//     console.log(drinks[0]);
//     // for (const letter of alphaget){
//     //     const drinks = await getCocktailsByLetter(letter);

//     //     for(const drink of drinks){
//     //         await saveCocktail(drink);
//     //     }
//     // }
// }

main()
    .catch((e) => {
        console.log(e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
//npm run seed


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

