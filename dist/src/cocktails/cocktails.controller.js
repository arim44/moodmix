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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CocktailsController = void 0;
const common_1 = require("@nestjs/common");
const cocktails_service_1 = require("./cocktails.service");
const create_cocktail_dto_1 = require("./dto/create-cocktail.dto");
const update_cocktail_dto_1 = require("./dto/update-cocktail.dto");
const swagger_1 = require("@nestjs/swagger");
const recommendCocktail_dto_1 = require("./recommend/dto/recommendCocktail.dto");
let CocktailsController = class CocktailsController {
    cocktailsService;
    constructor(cocktailsService) {
        this.cocktailsService = cocktailsService;
    }
    create(createCocktailDto) {
        return this.cocktailsService.create(createCocktailDto);
    }
    findAll() {
        return this.cocktailsService.findAll();
    }
    searcj(keyword) {
        return this.cocktailsService.search(keyword);
    }
    findOne(id) {
        return this.cocktailsService.findOne(+id);
    }
    recommend(dto) {
        return this.cocktailsService.recommend(dto);
    }
    update(id, updateCocktailDto) {
        return this.cocktailsService.update(+id, updateCocktailDto);
    }
    remove(id) {
        return this.cocktailsService.remove(+id);
    }
};
exports.CocktailsController = CocktailsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "칵테일 등록" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cocktail_dto_1.CreateCocktailDto]),
    __metadata("design:returntype", void 0)
], CocktailsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "칵테일 전체조회" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CocktailsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: "칵테일 이름 검색" }),
    __param(0, (0, common_1.Query)('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CocktailsController.prototype, "searcj", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: "칵테일 1개 상세조회" }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CocktailsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("recommend"),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: "재료 선택 추천" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recommendCocktail_dto_1.RecommendCocktailDto]),
    __metadata("design:returntype", void 0)
], CocktailsController.prototype, "recommend", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cocktail_dto_1.UpdateCocktailDto]),
    __metadata("design:returntype", void 0)
], CocktailsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CocktailsController.prototype, "remove", null);
exports.CocktailsController = CocktailsController = __decorate([
    (0, common_1.Controller)('cocktails'),
    __metadata("design:paramtypes", [cocktails_service_1.CocktailsService])
], CocktailsController);
//# sourceMappingURL=cocktails.controller.js.map