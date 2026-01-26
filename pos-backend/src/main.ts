import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('POS Backend')
    .setVersion('1.0')
    .build();

    SwaggerModule.setup(
      'api',
      app,
      SwaggerModule.createDocument(app, config),
    );
    await app.listen(3000);
}
bootstrap();
