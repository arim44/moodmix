import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AuthModule } from './auth/auth.module';
import { CocktailsModule } from './cocktails/cocktails.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UPLOAD_DIR } from './common/upload.config';
import { join } from 'path';

@Module({
  imports: [UsersModule, AuthModule, CocktailsModule, IngredientsModule, 
    FavoritesModule, PostsModule, PrismaModule,
    // 업로드한 이미지를 그대로 내어줌
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), UPLOAD_DIR),
      serveRoot: "/uploads"
    }),
  ],
  // http://localhost:3000/uploads/6dcff77b-4013-48bc-b789-bee5f61740eb.jpg
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
