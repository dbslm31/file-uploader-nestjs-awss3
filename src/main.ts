import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //CORS config
  app.enableCors({
    origin: ['*'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  //Server config
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
