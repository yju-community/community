import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './httpException.filter';
import { ValidationPipe } from '@nestjs/common';
import path from 'path';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  if (process.env.NODE_ENV === 'production') {
    app.enableCors({
      origin: ['https://yju.community.com'],
      credentials: true,
      exposedHeaders: ['Authorization'],
    });
  } else {
    app.enableCors({
      origin: ['http://localhost:3060'],
      credentials: true,
      exposedHeaders: ['Authorization'],
    });
  }

  app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  const config = new DocumentBuilder()
    .setTitle('YJP community API')
    .setDescription('YJP community 개발을 위한 API 문서입니다')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  await app.listen(port);
  console.log(`listening on port ${port}`);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
