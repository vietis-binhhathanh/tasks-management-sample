import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  // if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  // }

  const port = process.env.PORT || serverConfig.port;
  const options = new DocumentBuilder()
    .setTitle('Swagger example')
    .setDescription('The swagger API description')
    .setVersion('1.0')
    .addTag('cats').build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  logger.log(`Application running !!!`);
}
bootstrap();
