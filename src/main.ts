import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'http://localhost:3000',
    },
  });
  await app.listen(8000);
}
bootstrap();
