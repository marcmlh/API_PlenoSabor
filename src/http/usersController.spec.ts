import request from "supertest";
import { app } from "../app";
import { createConnection } from "../database/data-source";
import { DataSource } from "typeorm";
import { createAndAuthenticateUser } from "../test/utils/createAndAuthenticateUser";

let testConnection: DataSource;

describe("Create user", () => {
  beforeAll(async () => {
    let firstConnection = await createConnection();

    const queryRunner = firstConnection.createQueryRunner();

    await queryRunner.query(`DROP database if exists plenosabor_test_user`);

    await queryRunner.query(`create database plenosabor_test_user`);

    await queryRunner.release();
    await firstConnection.destroy();

    testConnection = await createConnection("plenosabor_test_user");

    await testConnection.runMigrations();
  });

  afterAll(async () => {
    await testConnection.destroy();
  });

  it("should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      user_name: "Marcelo",
      password: "123",
      email: "marcelo@gmail.com",
    });

    console.log("response: ", response);

    expect(response.status).toBe(201);
  });
});

describe("Get user by email", () => {
  beforeAll(async () => {
    let firstConnection = await createConnection();

    const queryRunner = firstConnection.createQueryRunner();

    await queryRunner.query(`DROP database if exists plenosabor_test_user`);

    await queryRunner.query(`create database plenosabor_test_user`);

    await queryRunner.release();
    await firstConnection.destroy();

    testConnection = await createConnection("plenosabor_test_user");

    await testConnection.runMigrations();
  });

  afterAll(async () => {
    await testConnection.destroy();
  });

  it("should be able to get an user by email", async () => {
    const token = await createAndAuthenticateUser(
      "Marcelo",
      "12345",
      "marcelo@gmail.com"
    );

    const response = await request(app)
      .get("/users")
      .query({ email: "marcelo@gmail.com" })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
  });
});

describe("Delete user by email", () => {
  beforeAll(async () => {
    let firstConnection = await createConnection();

    const queryRunner = firstConnection.createQueryRunner();

    await queryRunner.query(`DROP database if exists plenosabor_test_user`);

    await queryRunner.query(`create database plenosabor_test_user`);

    await queryRunner.release();
    await firstConnection.destroy();

    testConnection = await createConnection("plenosabor_test_user");

    await testConnection.runMigrations();
  });

  afterAll(async () => {
    await testConnection.destroy();
  });

  it("should be able to delete an user by email", async () => {
    const token = await createAndAuthenticateUser(
      "Marcelo",
      "12345",
      "marcelo@gmail.com"
    );

    const response = await request(app)
      .delete("/users")
      .query({ email: "marcelo@gmail.com" })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
  });
});

describe("Update User", () => {
  beforeAll(async () => {
    let firstConnection = await createConnection();

    const queryRunner = firstConnection.createQueryRunner();

    await queryRunner.query(`DROP database if exists plenosabor_test_user`);

    await queryRunner.query(`create database plenosabor_test_user`);

    await queryRunner.release();
    await firstConnection.destroy();

    testConnection = await createConnection("plenosabor_test_user");

    await testConnection.runMigrations();
  });

  afterAll(async () => {
    await testConnection.destroy();
  });

  it("should be able to update an user", async () => {
    const token = await createAndAuthenticateUser(
      "marcelino",
      "12345",
      "marcelo@gmail.com"
    );

    const response = await request(app)
      .put("/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user_name: "Lino",
        password: "12345",
        email: "thiago@gmail.com",
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(
      expect.objectContaining({
        user_name: "Lino",
        email: "thiago@gmail.com",
      })
    );
  });
});

describe("Authenticate user", () => {
  beforeAll(async () => {
    let firstConnection = await createConnection();

    const queryRunner = firstConnection.createQueryRunner();

    await queryRunner.query(`DROP database if exists plenosabor_test_user`);

    await queryRunner.query(`create database plenosabor_test_user`);

    await queryRunner.release();
    await firstConnection.destroy();

    testConnection = await createConnection("plenosabor_test_user");

    await testConnection.runMigrations();
  });

  afterAll(async () => {
    await testConnection.destroy();
  });

  it("should be able to authenticate an user", async () => {
    await request(app).post("/users").send({
      user_name: "Marcelo",
      password: "123",
      email: "marcelo@gmail.com",
    });

    const response = await request(app)
      .post("/users/authenticate")
      .send({ email: "marcelo@gmail.com", password: "123" });

    expect(response.status).toBe(200);
  });
});
