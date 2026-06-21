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
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FavoritesService = class FavoritesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    ;
    async create(userId, cocktailId) {
        const cocktail = await this.prisma.cocktail.findUnique({
            where: { id: cocktailId }
        });
        if (!cocktail)
            throw new common_1.NotFoundException(`칵테일 ${cocktailId}를 찾을 수 없습니다.`);
        const exists = await this.prisma.favorite.findUnique({
            where: {
                user_id_cocktail_id: {
                    user_id: userId,
                    cocktail_id: cocktailId
                }
            }
        });
        if (exists)
            throw new common_1.ConflictException("이미 즐겨찾기한 칵테일 입니다.");
        const favorite = await this.prisma.favorite.create({
            data: {
                user_id: userId,
                cocktail_id: cocktailId
            }
        });
        return { message: "즐겨찾기에 추가되었습니다.", favoriteId: favorite.id };
    }
    async findAll(userId) {
        const favorites = await this.prisma.favorite.findMany({
            where: { user_id: userId },
            include: { cocktail: true },
            orderBy: { createdAt: 'desc' }
        });
        return favorites.map((favorite) => ({
            favoriteId: favorite.id,
            cocktailId: favorite.cocktail_id,
            name: favorite.cocktail.name_en,
            imageUrl: favorite.cocktail.image_url,
            category: favorite.cocktail.category,
            alcoholic: favorite.cocktail.alcoholic,
            addedAt: favorite.createdAt
        }));
    }
    findOne(id) {
        return `This action returns a #${id} favorite`;
    }
    update(id, updateFavoriteDto) {
        return `This action updates a #${id} favorite`;
    }
    async remove(userId, favoriteId) {
        const favorite = await this.prisma.favorite.findUnique({
            where: { id: favoriteId }
        });
        if (!favorite)
            throw new common_1.NotFoundException("즐겨찾기를 찾을 수 없습니다.");
        if (favorite.user_id !== userId) {
            throw new common_1.NotFoundException("삭제 권한이 없습니다.");
        }
        await this.prisma.favorite.delete({
            where: { id: favoriteId }
        });
        return { message: "즐겨찾기가 삭제되었습니다.", favoriteId };
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map