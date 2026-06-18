import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  // app.enableCors();    // 모든 Origin 허용

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();