import * as dotenv from 'dotenv';
dotenv.config();

import { initializeDatabase } from '../../scripts/initialize-test-database';

import request from 'supertest';

import { app } from '../app';

import { connect, disconnect } from '../model/postgres-connect';

const API_VERSION = process.env.API_VERSION;

let signInJwtToken = '';

describe('Launches API', () => {
  beforeAll(async () => {
    // await initializeDatabase();
    // await connect(process.env.TEST_POSTGRES!);
  });

  afterAll(async () => {
    // await disconnect();
  });

  describe('Test POST /register', () => {
    const registerData = {
      name: 'thanasis',
      password: '123',
      registerToken: process.env.REGISTER_AUTH_TOKEN
    };
    const registerDataWrongRegisterToken = {
      name: 'thanasis2',
      password: '123',
      registerToken: 'wrong register token'
    };
    test('It should respond with 201 and return a token', async () => {
      const response = await request(app)
        .post(`/register`)
        .send(registerData)
        .expect('Content-Type', /json/)
        .expect(201)
        .expect((res: any) => {
          const token = res.body['token'];
          expect(token).toBeDefined();
          signInJwtToken = token;
        });
    });

    test('It should respond with 405, Username Already Exists', async () => {
      const response = await request(app)
        .post(`/register`)
        .send(registerData)
        .expect('Content-Type', /json/)
        .expect(405);
    });

    test('It should respond with 401, Wrong Register Token', async () => {
      const response = await request(app)
        .post(`/register`)
        .send(registerDataWrongRegisterToken)
        .expect('Content-Type', /json/)
        .expect(401);
    });
  });

  describe('Test POST /login', () => {
    const loginData = {
      name: 'thanasis',
      password: '123'
    };

    const loginDataWrongName = {
      name: 'wrongThanos',
      password: '123'
    };
    const loginDataWrongPassword = {
      name: 'thanasis',
      password: '321'
    };

    test('It should respond with 200 and return a token', async () => {
      const response = await request(app)
        .post(`/sign-in`)
        .send(loginData)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res: any) => {
          const token = res.body['token'];
          expect(token).toBeDefined();
          signInJwtToken = token;
        });
    });
    test('It should respond with 405, User Doesnt Exists', async () => {
      const response = await request(app)
        .post(`/sign-in`)
        .send(loginDataWrongName)
        .expect('Content-Type', /json/)
        .expect(405);
    });
    test('It should respond with 401, Password is wrong', async () => {
      const response = await request(app)
        .post(`/sign-in`)
        .send(loginDataWrongPassword)
        .expect('Content-Type', /json/)
        .expect(401);
    });
  });

  describe('Test GET /order-status', () => {
    test('It should respond with 200', async () => {
      const response = await request(app)
        .get(`/order-status`)
        .set('Authorization', `Bearer ${signInJwtToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });

    test('It should respond with 200, ?scanned=true', async () => {
      const response = await request(app)
        .get(`/order-status?scanned=true`)
        .set('Authorization', `Bearer ${signInJwtToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });

    test('It should respond with 200, ?scanned=false', async () => {
      const response = await request(app)
        .get(`/order-status?scanned=false`)
        .set('Authorization', `Bearer ${signInJwtToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });

    test('It should respond with 200, /:driver', async () => {
      const response = await request(app)
        .get(`/order-status/Moe`)
        .set('Authorization', `Bearer ${signInJwtToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });

    test('It should respond with 200, /:driver?scanned=true', async () => {
      const response = await request(app)
        .get(`/order-status/Moe?scanned=true`)
        .set('Authorization', `Bearer ${signInJwtToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });

    test('It should respond with 200, /:driver?scanned=false', async () => {
      const response = await request(app)
        .get(`/order-status/Moe?scanned=false`)
        .set('Authorization', `Bearer ${signInJwtToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });

    test('It should respond with 401, Wrong JWT token', async () => {
      const response = await request(app)
        .get(`/order-status`)
        .set('Authorization', `Bearer WrongToken`)
        .expect('Content-Type', /json/)
        .expect(401);
    });
  });

  describe('Test PUT /scan/:voucher', () => {
    test('It should respond with 204', async () => {
      const response = await request(app)
        .put(`/scan/A1A`)
        .set('Authorization', `Bearer ${signInJwtToken}`)
        .send({})
        .expect(204);
    });

    test('It should respond with 404, Asset not Found', async () => {
      const response = await request(app)
        .put(`/scan/VOUCHER_DOESNT_EXIST`)
        .set('Authorization', `Bearer ${signInJwtToken}`)
        .send({})
        .expect(404);
    });

    test('It should respond with 401, Wrong JWT token', async () => {
      const response = await request(app)
        .put(`/scan/A1A`)
        .set('Authorization', `Bearer wrongwrong`)
        .send({})
        .expect(401);
    });
  });

  describe('Test GET /drivers', () => {
    test('It should respond with 200', async () => {
      const response = await request(app)
        .get(`/drivers`)
        .set('Authorization', `Bearer ${signInJwtToken}`)
        .expect(200);
    });

    test('It should respond with 401, Wrong JWT token', async () => {
      const response = await request(app)
        .get(`/drivers`)
        .set('Authorization', `Bearer wrongToken..`)
        .expect(401);
    });
  });

  describe('Test POST /drivers', () => {
    test('It should respond with 201', async () => {
      const response = await request(app)
        .post(`/drivers`)
        .set('Authorization', `Bearer ${signInJwtToken}`)
        .expect(201);
    });

    test('It should respond with 401, Wrong JWT token', async () => {
      const response = await request(app)
        .post(`/drivers`)
        .send({})
        .set('Authorization', `Bearer wrongToken..`)
        .expect(401);
    });
  });

  describe('Test PUT /drivers', () => {
    test('It should respond with 200', async () => {
      const response = await request(app)
        .put(`/drivers`)
        .send({})
        .set('Authorization', `Bearer ${signInJwtToken}`)
        .expect(200);
    });

    test('It should respond with 401, Wrong JWT token', async () => {
      const response = await request(app)
        .put(`/drivers`)
        .send({})
        .set('Authorization', `Bearer wrongToken..`)
        .expect(401);
    });
  });

  describe('Test DELETE /drivers', () => {
    test('It should respond with 204', async () => {
      const response = await request(app)
        .delete(`/drivers`)
        .set('Authorization', `Bearer ${signInJwtToken}`)
        .expect(204);
    });

    test('It should respond with 401, Wrong JWT token', async () => {
      const response = await request(app)
        .delete(`/drivers`)
        .set('Authorization', `Bearer wrongToken..`)
        .expect(401);
    });
  });

  describe('Test GET /clusters', () => {
    test('It should respond with 200', async () => {
      const response = await request(app)
        .get(`/clusters`)
        .set('Authorization', `Bearer ${signInJwtToken}`)
        .expect(200);
    });

    test('It should respond with 401, Wrong JWT token', async () => {
      const response = await request(app)
        .get(`/clusters`)
        .set('Authorization', `Bearer wrongToken..`)
        .expect(401);
    });
  });

  describe('Test POST /clusters', () => {
    test('It should respond with 201', async () => {
      const response = await request(app)
        .post(`/clusters`)
        .set('Authorization', `Bearer ${signInJwtToken}`)
        .expect(201);
    });

    test('It should respond with 401, Wrong JWT token', async () => {
      const response = await request(app)
        .post(`/clusters`)
        .set('Authorization', `Bearer wrongToken..`)
        .expect(401);
    });
  });

  describe('Test PUT /clusters', () => {
    test('It should respond with 200', async () => {
      const response = await request(app)
        .put(`/clusters`)
        .send({})
        .set('Authorization', `Bearer ${signInJwtToken}`)
        .expect(200);
    });

    test('It should respond with 401, Wrong JWT token', async () => {
      const response = await request(app)
        .put(`/clusters`)
        .send({})
        .set('Authorization', `Bearer wrongToken..`)
        .expect(401);
    });
  });

  describe('Test DELETE /clusters', () => {
    test('It should respond with 204', async () => {
      const response = await request(app)
        .delete(`/clusters`)
        .set('Authorization', `Bearer ${signInJwtToken}`)
        .expect(204);
    });

    test('It should respond with 401, Wrong JWT token', async () => {
      const response = await request(app)
        .delete(`/clusters`)
        .set('Authorization', `Bearer wrongToken..`)
        .expect(401);
    });
  });

  describe('Test GET /init-database', () => {
    test('It should respond with 204', async () => {
      const response = await request(app)
        .get(`/init-database`)
        .send({})
        .set('Authorization', `Bearer ${signInJwtToken}`)
        .expect(204);
    });
  });
});