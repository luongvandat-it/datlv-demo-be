import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure global pipes
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  // Configure express-session middleware
  app.use(
    session({
      secret: 'your-secret-key', // You should use a strong secret here
      resave: false,
      saveUninitialized: false,
    }),
  );

  // Start the NestJS application
  await app.listen(3000);
}

bootstrap();
