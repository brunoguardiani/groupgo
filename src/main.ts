/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',  // Allow frontend running on this URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Accept, Authorization',  // Allowed headers
    credentials: true,  // Allow cookies or authentication tokens
  });

  await app.listen(3000);
}
bootstrap();
