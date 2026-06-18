"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CocktailsService = void 0;
const common_1 = require("@nestjs/common");
let CocktailsService = class CocktailsService {
    create(createCocktailDto) {
        return 'This action adds a new cocktail';
    }
    findAll() {
        return `This action returns all cocktails`;
    }
    findOne(id) {
        return `This action returns a #${id} cocktail`;
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
    (0, common_1.Injectable)()
], CocktailsService);
//# sourceMappingURL=cocktails.service.js.map