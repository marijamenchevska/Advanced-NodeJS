import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('Music app')
    .setDescription('API for managing artists and songs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // In case it doesn't work
  // .addBearerAuth(
  //   {
  //     type: 'http',
  //     scheme: 'bearer',
  //     bearerFormat: 'JWT',
  //   },
  //   'bearer',
  // )
  // .addSecurityRequirements('bearer') -> This is to not have to put @ApiBearerAuth() in every controller

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
