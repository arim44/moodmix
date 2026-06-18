import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // mkdirSync(UPLOAD_DIR, {recursive:true}) //디렉토리 밑에 uploads 생성
  
  const app = await NestFactory.create(AppModule);

  // CORS 설정
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  // app.enableCors();    // 모든 Origin 허용

  //whitelist (dto에 없는 필드 자동 제거)
  app.useGlobalPipes(new ValidationPipe({whitelist:true, transform:true}));

  const config = new DocumentBuilder()
    .setTitle("MoodMix API(realtion 추가)")
    .setDescription("1:N, 칵테일_재료 매핑 M:N")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  SwaggerModule.setup("docs", app, SwaggerModule.createDocument(app, config));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`moodmix 시작 : Http://localhost:${process.env.PORT} (Swagger 문서: /docs)`);
}
bootstrap();