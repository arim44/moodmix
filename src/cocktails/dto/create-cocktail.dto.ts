export class CreateCocktailDto {
    external_id: number;
}



// // 칵테일
// model Cocktail {
//   id             Int     @id @default(autoincrement()) // 칵테일 고유 ID
//   external_id    Int?    @unique // 칵테일DB ID
//   name_en        String // 영문이름
//   name_ko        String? // 한글이름
//   image_url      String? // 칵테일 이미지 경로
//   category       String // 칵테일 카테고리
//   alcoholic      String // 알콜여부
//   glass          String // 사용잔 종류
//   instruction_en String // 영문 제조방법
//   instruction_ko String? // 영문 제조방법

//   ingredients CocktailIngredient[]
//   favorites   Favorite[]
// }