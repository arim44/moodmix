// 칵테일 DB 패치

import { CocktailDbDrink } from "./cocktaildb.type";

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1'; // /search.php?f=a

// 알파벳 별로 칵테일목록 불러오기
export async function getCocktailsByLetter(letter: string): Promise<CocktailDbDrink[]> {   //Promise<CocktailDbDrink[]> 

    try{
        const response = await fetch(`${BASE_URL}/search.php?f=${letter}`);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('칵테일을 찾을 수 없습니다.');
        }
        throw new Error(`HTTP error! status:${response.status}`);
    }

    const data = await response.json();
    return data.drinks ?? [];
    } catch(err){
        console.error('검색 중 오류', err);
        throw err;
    } 

}