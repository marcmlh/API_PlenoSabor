import request from "supertest";
import { app } from "../app";
import { createConnection } from "../database/data-source";
import { DataSource } from "typeorm";
import { createAndAuthenticateUser } from "../test/utils/createAndAuthenticateUser";

let testConnection: DataSource;

describe("Create order", () => {
  beforeAll(async () => {
    let firstConnection = await createConnection();

    const queryRunner = firstConnection.createQueryRunner();

    await queryRunner.query(`DROP database if exists plenosabor_test_order`);

    await queryRunner.query(`create database plenosabor_test_order`);

    await queryRunner.release();
    await firstConnection.destroy();

    testConnection = await createConnection("plenosabor_test_order");

    await testConnection.runMigrations();
  });

  afterAll(async () => {
    await testConnection.destroy();
  });

  it("should be able to create a new order", async () => {
    const token = await createAndAuthenticateUser(
      "Marcelo",
      "12345",
      "marcelo@gmail.com"
    );

    const response = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(201);
  });
});

describe("Find orders", () => {
  beforeAll(async () => {
    let firstConnection = await createConnection();

    const queryRunner = firstConnection.createQueryRunner();

    await queryRunner.query(`DROP database if exists plenosabor_test_order`);

    await queryRunner.query(`create database plenosabor_test_order`);

    await queryRunner.release();
    await firstConnection.destroy();

    testConnection = await createConnection("plenosabor_test_order");

    await testConnection.runMigrations();
  });

  afterAll(async () => {
    await testConnection.destroy();
  });

  it("should be able to find orders by user_id", async () => {
    const token = await createAndAuthenticateUser(
      "Marcelo",
      "12345",
      "marcelo@gmail.com"
    );

     await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send();

      await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send();

    const response = await request(app)
      .get("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
  });
});

describe("Delete order", () => {
  beforeAll(async () => {
    let firstConnection = await createConnection();

    const queryRunner = firstConnection.createQueryRunner();

    await queryRunner.query(`DROP database if exists plenosabor_test_order`);

    await queryRunner.query(`create database plenosabor_test_order`);

    await queryRunner.release();
    await firstConnection.destroy();

    testConnection = await createConnection("plenosabor_test_order");

    await testConnection.runMigrations();
  });

  afterAll(async () => {
    await testConnection.destroy();
  });

  it("should be able to delete an order by id", async () => {
    const token = await createAndAuthenticateUser(
      "Marcelo",
      "12345",
      "marcelo@gmail.com"
    );

    const order = await request(app)
    .post("/orders")
    .set("Authorization", `Bearer ${token}`)
    .send();

    const response = await request(app)
      .delete(`/orders/${order.body.data.order_id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
  });
});

describe("Patch order", () => {
    beforeAll(async () => {
      let firstConnection = await createConnection();
  
      const queryRunner = firstConnection.createQueryRunner();
  
      await queryRunner.query(`DROP database if exists plenosabor_test_order`);
  
      await queryRunner.query(`create database plenosabor_test_order`);
  
      await queryRunner.release();
      await firstConnection.destroy();
  
      testConnection = await createConnection("plenosabor_test_order");
  
      await testConnection.runMigrations();
    });
  
    afterAll(async () => {
      await testConnection.destroy();
    });
  
    it("should be able to patch an order", async () => {
      const token = await createAndAuthenticateUser(
        "Marcelo",
        "12345",
        "marcelo@gmail.com"
      );
  
    
      const order = await request(app)
    .post("/orders")
    .set("Authorization", `Bearer ${token}`)
    .send();
  
      const operations = {
        "operations": [
        { "op": "replace", "path": "/payment_status", "value": true},
    ]
    }
  
      const response = await request(app)
        .patch(`/orders/${order.body.data.order_id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(operations);
    
      expect(response.status).toBe(200);
      expect(response.body.data.payment_status).toBe(true)
    });
  });

