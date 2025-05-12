import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita validaciones automáticas usando los DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,      // Elimina propiedades no declaradas en el DTO
      forbidNonWhitelisted: true, // Lanza error si se incluye una propiedad no permitida
      transform: true,      // Transforma payloads a instancias de clases DTO
    }),
  );
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
