import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true // avoid orther infomation in your req.body
    })
  )
  await app.listen(3001);
}
bootstrap();

// Users : Sign-In, Sign-Up -> Controller, Service, Entity (To Database), Repository
// Reports: Create, Update, Delete, Find -> Controller, Service, Entity, Repository
// ->> UsersModule - ReportsModule
// Entity (Database) -> createConnection (forRoot in AppModule)
// TypeOrmModule forFeature -> Both UserEntity & Reports Entity (of UserModule & ReportModule)
