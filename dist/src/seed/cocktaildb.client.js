"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCocktailsByLetter = getCocktailsByLetter;
const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';
async function getCocktailsByLetter(letter) {
    try {
        const response = await fetch(`${BASE_URL}/search.php?f=${letter}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('칵테일을 찾을 수 없습니다.');
            }
            throw new Error(`HTTP error! status:${response.status}`);
        }
        const data = await response.json();
        return data.drinks ?? [];
    }
    catch (err) {
        console.error('검색 중 오류', err);
        throw err;
    }
}
//# sourceMappingURL=cocktaildb.client.js.map