"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CocktailsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CocktailsService = class CocktailsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    ;
    create(createCocktailDto) {
        return 'This action adds a new cocktail';
    }
    async findAll() {
        const cocktails = await this.prisma.cocktail.findMany({
            orderBy: { name_en: 'asc' }
        });
        return cocktails.map((data) => ({
            id: data.id,
            name: data.name_en,
            image: data.image_url,
            category: data.category,
            alcoholic: data.alcoholic
        }));
    }
    async findOne(id) {
        const cocktail = await this.prisma.cocktail.findUnique({
            where: { id },
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    }
                }
            }
        });
        if (!cocktail)
            throw new common_1.NotFoundException(`칵테일 아이디 ${id} 찾을 수 없습니다`);
        return {
            id: cocktail.id,
            name: cocktail.name_en,
            image: cocktail.image_url,
            category: cocktail.category,
            alcoholic: cocktail.alcoholic,
            glass: cocktail.glass,
            instruction: cocktail.instruction_en,
            ingredients: cocktail.ingredients.map(item => ({
                name: item.ingredient.name_en,
                measure: item.measure
            }))
        };
    }
    update(id, updateCocktailDto) {
        return `This action updates a #${id} cocktail`;
    }
    remove(id) {
        return `This action removes a #${id} cocktail`;
    }
    async search(keyword) {
        if (!keyword?.trim())
            throw new common_1.BadRequestException('검색어를 입력해주세요.');
        const cocktails = await this.prisma.cocktail.findMany({
            where: {
                name_en: {
                    contains: keyword,
                    mode: 'insensitive'
                }
            },
            orderBy: { name_en: 'asc' }
        });
        if (cocktails.length === 0)
            throw new common_1.NotFoundException(`"${keyword}" 검색 결과가 없습니다.`);
        return cocktails.map((cocktail) => ({
            id: cocktail.id,
            name: cocktail.name_en,
            image: cocktail.image_url,
            alcoholic: cocktail.alcoholic,
            category: cocktail.category
        }));
    }
    async recommend(dto) {
        const cocktails = await this.prisma.cocktail.findMany({
            include: {
                ingredients: true,
            }
        });
        const count = await this.prisma.ingredient.count({
            where: { id: { in: dto.ingredientIds } }
        });
        if (count !== dto.ingredientIds.length)
            throw new common_1.NotFoundException("존재하지 않는 재료입니다.");
        const result = cocktails.map((cocktail) => {
            const matchedCount = cocktail.ingredients.filter((item) => dto.ingredientIds.includes(item.ingredient_id)).length;
            const totalCount = cocktail.ingredients.length;
            const matchRate = totalCount > 0 ? Math.round((matchedCount / totalCount) * 100) : 0;
            return {
                id: cocktail.id,
                name: cocktail.name_en,
                image: cocktail.image_url,
                matchCount: matchedCount,
                totalCount,
                matchRate,
            };
        }).filter((data) => data.matchRate > 30)
            .sort((a, b) => {
            if (b.matchCount !== a.matchCount) {
                return b.matchCount - a.matchCount;
            }
            return b.matchRate - a.matchRate;
        })
            .slice(0, 5);
        if (result.length === 0)
            throw new common_1.NotFoundException("선택한 재료로 만들 수 있는 칵테일이 없습니다.");
        return result;
    }
};
exports.CocktailsService = CocktailsService;
exports.CocktailsService = CocktailsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CocktailsService);
//# sourceMappingURL=cocktails.service.js.map