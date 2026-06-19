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
    findAll() {
        return this.prisma.cocktail.findMany({
            orderBy: { id: 'asc' }
        });
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
        return cocktail;
    }
    update(id, updateCocktailDto) {
        return `This action updates a #${id} cocktail`;
    }
    remove(id) {
        return `This action removes a #${id} cocktail`;
    }
};
exports.CocktailsService = CocktailsService;
exports.CocktailsService = CocktailsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CocktailsService);
//# sourceMappingURL=cocktails.service.js.map