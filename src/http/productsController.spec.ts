import request from "supertest";
import { app } from "../app";
import { createConnection } from "../database/data-source";
import { DataSource } from "typeorm";
import { createAndAuthenticateUser } from "../test/utils/createAndAuthenticateUser";
import { createProduct } from "../test/utils/createProducs";

let testConnection: DataSource;

describe("Create product", () => {
  beforeAll(async () => {
    let firstConnection = await createConnection();

    const queryRunner = firstConnection.createQueryRunner();

    await queryRunner.query(`DROP database if exists plenosabor_test_product`);

    await queryRunner.query(`create database plenosabor_test_product`);

    await queryRunner.release();
    await firstConnection.destroy();

    testConnection = await createConnection("plenosabor_test_product");

    await testConnection.runMigrations();
  });

  afterAll(async () => {
    await testConnection.destroy();
  });

  it("should be able to create a new product", async () => {
    const token = await createAndAuthenticateUser(
      "Marcelo",
      "12345",
      "marcelo@gmail.com"
    );

    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        product_name: "Pizza de Shimeji",
        category: "Pizzas Salgadas",
        price: 75.99,
      });

    expect(response.status).toBe(201);
  });
});

describe("Find product", () => {
  beforeAll(async () => {
    let firstConnection = await createConnection();

    const queryRunner = firstConnection.createQueryRunner();

    await queryRunner.query(`DROP database if exists plenosabor_test_product`);

    await queryRunner.query(`create database plenosabor_test_product`);

    await queryRunner.release();
    await firstConnection.destroy();

    testConnection = await createConnection("plenosabor_test_product");

    await testConnection.runMigrations();
  });

  afterAll(async () => {
    await testConnection.destroy();
  });

  it("should be able to find a product by name", async () => {
    const token = await createAndAuthenticateUser(
      "Marcelo",
      "12345",
      "marcelo@gmail.com"
    );

    const product = await createProduct(
      "Pizza de Shimeji",
      "Pizzas Salgadas",
      75.99,
      "Pizza com queijo e shimeji",
      token
    );

    const response = await request(app)
      .get("/products")
      .set("Authorization", `Bearer ${token}`)
      .query({ product_name: product.product_name })
      .send();

    expect(response.status).toBe(200);
  });
});

describe("Delete product", () => {
  beforeAll(async () => {
    let firstConnection = await createConnection();

    const queryRunner = firstConnection.createQueryRunner();

    await queryRunner.query(`DROP database if exists plenosabor_test_product`);

    await queryRunner.query(`create database plenosabor_test_product`);

    await queryRunner.release();
    await firstConnection.destroy();

    testConnection = await createConnection("plenosabor_test_product");

    await testConnection.runMigrations();
  });

  afterAll(async () => {
    await testConnection.destroy();
  });

  it("should be able to delete a product by name", async () => {
    const token = await createAndAuthenticateUser(
      "Marcelo",
      "12345",
      "marcelo@gmail.com"
    );

    const product = await createProduct(
      "Pizza de Shimeji",
      "Pizzas Salgadas",
      75.99,
      "Pizza com queijo e shimeji",
      token
    );

    const response = await request(app)
      .delete("/products")
      .set("Authorization", `Bearer ${token}`)
      .query({product_name : product.product_name})
      .send();

    expect(response.status).toBe(200);
  });
});

describe("Patch product", () => {
  beforeAll(async () => {
    let firstConnection = await createConnection();

    const queryRunner = firstConnection.createQueryRunner();

    await queryRunner.query(`DROP database if exists plenosabor_test_product`);

    await queryRunner.query(`create database plenosabor_test_product`);

    await queryRunner.release();
    await firstConnection.destroy();

    testConnection = await createConnection("plenosabor_test_product");

    await testConnection.runMigrations();
  });

  afterAll(async () => {
    await testConnection.destroy();
  });

  it("should be able to patch a product", async () => {
    const token = await createAndAuthenticateUser(
      "Marcelo",
      "12345",
      "marcelo@gmail.com"
    );

    const product = await createProduct(
      "Pizza de Shimeji",
      "Pizzas Salgadas",
      75.99,
      "Pizza com queijo e shimeji",
      token
    );

    const operations = {
      "operations": [
      { "op": "replace", "path": "/price", "value": 80.99}
    ]
    }

    const response = await request(app)
      .patch(`/products/${product.product_id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(operations);

    expect(response.status).toBe(200);
    expect(response.body.data.price).toBe(80.99)
  });
});

