import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import request, { Response } from 'supertest';

import app from '../app';

const createTestUser = () => ({
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  password: 'secret123',
});

describe('Auth API integration tests', () => {
  let testUser: ReturnType<typeof createTestUser>

  beforeAll(async () => {
    await mongoose.connect(globalThis.__MONGO_URI__, {
      dbName: globalThis.__MONGO_DB_NAME__,
    });
  });

  beforeEach(() => {
    testUser = createTestUser();
  })

  afterAll(async () => {
    await mongoose.disconnect();
  })

  it("should register a new user", async () => {
    const res: Response = await request(app).post("/api/auth/register").send(testUser);
    expect(res.status).toBe(201);
    const body = res.body as {
      email: string;
      firstName: string;
      id: string;
      lastName: string;
    };
    expect(body).toHaveProperty("firstName");
    expect(body.firstName).toBe(testUser.firstName);
  });

  it("should fail to register with duplicate email", async () => {
    await request(app).post("/api/auth/register").send(testUser);
    const res: Response = await request(app)
      .post("/api/auth/register")
      .send(testUser);
    const body = res.body as {
      message: string;
    };
    expect(res.status).toBe(400);
    expect(body.message).toBe("User with this email is already registered");
  });

  it("should login with correct credentials", async () => {
    await request(app).post("/api/auth/register").send(testUser);
    const res: Response = await request(app).post("/api/auth/login").send({
      email: testUser.email.toLowerCase(),
      password: testUser.password,
    });
    const body = res.body as {
      email: string;
      firstName: string;
      id: string;
      lastName: string;
    };
    expect(res.status).toBe(200);
    expect(body).toHaveProperty("firstName");
    expect(body.firstName).toBe(testUser.firstName);
  });

  it("should fail login with wrong password", async () => {
    await request(app).post("/api/auth/register").send(testUser);
    const res: Response = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: "wrongpassword",
    });
    const body = res.body as {
      message: string;
    };
    expect(res.status).toBe(400);
    expect(body.message).toBe("Invalid email or password");
  });
})
