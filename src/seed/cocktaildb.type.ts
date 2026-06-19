// 칵테일 씨드
export interface CocktailSeedData {
    externalId: number;
    name: string;
    imageThumb: string;
    category: string;
    alcoholic: string;
    glass: string;
    instruction_en: string;
    ingredients: CocktailIngredientData[];
}

// 재료용
export interface CocktailIngredientData {
    name : string;
    measure : string;
}

// 칵테일 오픈 칵테일디비 api 용 
export interface CocktailDbDrink {
    idDrink: string;            // 칵테일 ID
    strDrink: string;           // 칵테일 이름
    strDrinkThumb: string;      // 칵테일 썸네일 이미지
    strCategory: string;        // 칵테일 카테고리
    strAlcoholic: string;       // 칵테일 알콜여부
    strGlass: string;           // 칵테일 사용 잔
    strInstructions: string;    // 칵테일 제조법
    // 칵테일 재료들
    strIngredient1?: string;
    strIngredient2?: string;
    strIngredient3?: string;
    strIngredient4?: string;
    strIngredient5?: string;
    strIngredient6?: string;
    strIngredient7?: string;
    strIngredient8?: string;
    strIngredient9?: string;
    strIngredient10?: string;
    strIngredient11?: string;
    strIngredient12?: string;
    strIngredient13?: string;
    strIngredient14?: string;
    strIngredient15?: string;
    // 재료별 사용량
    strMeasure1?: string;
    strMeasure2?: string;
    strMeasure3?: string;
    strMeasure4?: string;
    strMeasure5?: string;
    strMeasure6?: string;
    strMeasure7?: string;
    strMeasure8?: string;
    strMeasure9?: string;
    strMeasure10?: string;
    strMeasure11?: string;
    strMeasure12?: string;
    strMeasure13?: string;
    strMeasure14?: string;
    strMeasure15?: string;
}