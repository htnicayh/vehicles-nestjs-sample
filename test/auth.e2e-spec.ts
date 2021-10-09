import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app/app.module';


describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({ email: 'asdf@asdf.com', password: 'asdf' })
      .expect(201)
      .then((repsonse) => {
          const { id, email } = repsonse.body
          expect(id).toBeDefined()
          expect(email).toEqual('asdf@asdf.com')
      })
  });
});