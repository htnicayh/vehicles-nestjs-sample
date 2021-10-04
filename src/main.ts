import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common'

const CookieSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(CookieSession({
    keys: ['znoktob']
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true // avoid orther infomation in your req.body
    })
  )
  await app.listen(3000);
}
bootstrap();

