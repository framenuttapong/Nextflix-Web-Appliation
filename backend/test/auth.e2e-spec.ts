import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ name: 'test', email: 'test@example.com', password: '1234' })
      .expect(201);
  });

  it('/auth/login (POST) + profile (cookie)', async () => {
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: '1234',
      })
      .expect(200);

    console.log('>>> loginRes.body:', loginRes.body);
    console.log('>>> set-cookie:', loginRes.headers['set-cookie']);

    const cookie = loginRes.headers['set-cookie'][0];
    console.log('>>> SET-COOKIE:', cookie);

    //ToDo: Now can't get profile with the cookie Fix this next
    await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Cookie', cookie)
      .expect(200);
  });


  afterAll(async () => {
    await app.close();
  });
});
