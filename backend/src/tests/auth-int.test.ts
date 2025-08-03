import { faker } from '@faker-js/faker';
import app from '../app';
import request from 'supertest';
import mongoose from 'mongoose';

const createTestUser = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: 'secret123',
});

describe('Auth API integration tests', () => {
  let testUser: ReturnType<typeof createTestUser>

  beforeAll(async () => {
    await mongoose.connect(globalThis.__MONGO_URI__!, {
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
    const res = await request(app).post("/api/auth/register").send(testUser);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.firstName).toBe(testUser.firstName);
  });

  it("should fail to register with duplicate email", async () => {
    await request(app).post("/api/auth/register").send(testUser);
    const res = await request(app).post("/api/auth/register").send(testUser);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("User with this email is already registered");
  });

  it("should login with correct credentials", async () => {
    await request(app).post("/api/auth/register").send(testUser);
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.firstName).toBe(testUser.firstName);
  });

  it("should fail login with wrong password", async () => {
    await request(app).post("/api/auth/register").send(testUser);
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: "wrongpassword",
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid email or password");
  });
})
