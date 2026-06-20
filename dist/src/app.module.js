"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const prisma_module_1 = require("./prisma/prisma.module");
const posts_module_1 = require("./posts/posts.module");
const favorites_module_1 = require("./favorites/favorites.module");
const auth_module_1 = require("./auth/auth.module");
const cocktails_module_1 = require("./cocktails/cocktails.module");
const ingredients_module_1 = require("./ingredients/ingredients.module");
const serve_static_1 = require("@nestjs/serve-static");
const upload_config_1 = require("./common/upload.config");
const path_1 = require("path");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, auth_module_1.AuthModule, cocktails_module_1.CocktailsModule, ingredients_module_1.IngredientsModule,
            favorites_module_1.FavoritesModule, posts_module_1.PostsModule, prisma_module_1.PrismaModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(process.cwd(), upload_config_1.UPLOAD_DIR),
                serveRoot: "/uploads"
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map