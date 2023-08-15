import request from "supertest";
import { app } from "../app";
import { createConnection } from "../database/data-source";
import { DataSource } from "typeorm";
import { createAndAuthenticateUser } from "../test/utils/createAndAuthenticateUser";
import { createProduct } from "../test/utils/createProducs";

let testConnection: DataSource;

describe("Create item list", () => {
  beforeAll(async () => {
    let firstConnection = await createConnection();

    const queryRunner = firstConnection.createQueryRunner();

    await queryRunner.query(`DROP database if exists plenosabor_test_itemlist`);

    await queryRunner.query(`create database plenosabor_test_itemlist`);

    await queryRunner.release();
    await firstConnection.destroy();

    testConnection = await createConnection("plenosabor_test_itemlist");

    await testConnection.runMigrations();
  });

  afterAll(async () => {
    await testConnection.destroy();
  });

  it("should be able to create a new itemList", async () => {
    const token = await createAndAuthenticateUser(
      "Marcelo",
      "12345",
      "marcelo@gmail.com"
    );

    const order = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send();

    const product = await createProduct(
      "Pizza de Shimeji",
      "Pizzas Salgadas",
      75.99,
      "Pizza com queijo e shimeji",
      token
    );

    const response = await request(app)
      .post(`/itemsList`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        order_id: order.body.data.order_id,
        product_id: product.product_id,
        quantity: 2,
        details: "sem azeitonas",
      });

    expect(response.status).toBe(201);
  });
});

describe("Find itemsList from an orders", () => {
  beforeAll(async () => {
    let firstConnection = await createConnection();

    const queryRunner = firstConnection.createQueryRunner();

    await queryRunner.query(`DROP database if exists plenosabor_test_itemlist`);

    await queryRunner.query(`create database plenosabor_test_itemlist`);

    await queryRunner.release();
    await firstConnection.destroy();

    testConnection = await createConnection("plenosabor_test_itemlist");

    await testConnection.runMigrations();
  });

  afterAll(async () => {
    await testConnection.destroy();
  });

  it("should be able to find itemsList from an order by order_id", async () => {
    const token = await createAndAuthenticateUser(
      "Marcelo",
      "12345",
      "marcelo@gmail.com"
    );

    const order = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send();

    const product = await createProduct(
      "Pizza de Shimeji",
      "Pizzas Salgadas",
      75.99,
      "Pizza com queijo e shimeji",
      token
    );

    const product_01 = await createProduct(
      "Pizza de Amor",
      "Pizzas Doces",
      99.99,
      "Pizza com um toque de Lino",
      token
    );

    const item1 = await request(app)
      .post(`/itemsList`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        order_id: order.body.data.order_id,
        product_id: product.product_id,
        quantity: 2,
        details: "sem azeitonas",
      });

    const item02 = await request(app)
      .post(`/itemsList`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        order_id: order.body.data.order_id,
        product_id: product_01.product_id,
        quantity: 1,
      });

    const response = await request(app)
      .get(`/itemsList`)
      .set("Authorization", `Bearer ${token}`)
      .query({ order_id: order.body.data.order_id })
      .send();

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
  });
});

describe("Delete itemList", () => {
  beforeAll(async () => {
    let firstConnection = await createConnection();

    const queryRunner = firstConnection.createQueryRunner();

    await queryRunner.query(`DROP database if exists plenosabor_test_itemlist`);

    await queryRunner.query(`create database plenosabor_test_itemlist`);

    await queryRunner.release();
    await firstConnection.destroy();

    testConnection = await createConnection("plenosabor_test_itemlist");

    await testConnection.runMigrations();
  });

  afterAll(async () => {
    await testConnection.destroy();
  });

  it("should be able to delete an itemList", async () => {
    const token = await createAndAuthenticateUser(
      "Marcelo",
      "12345",
      "marcelo@gmail.com"
    );

    const order = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send();

    const product = await createProduct(
      "Pizza de Shimeji",
      "Pizzas Salgadas",
      75.99,
      "Pizza com queijo e shimeji",
      token
    );

    const itemList = await request(app)
      .post(`/itemsList`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        order_id: order.body.data.order_id,
        product_id: product.product_id,
        quantity: 2,
        details: "sem azeitonas",
      });

    const response = await request(app)
      .delete(`/itemsList`)
      .set("Authorization", `Bearer ${token}`)
      .query({ itemList_id: itemList.body.data.itemList_id })
      .send();

    expect(response.status).toBe(200);
  });
});

describe("Patch itemList", () => {
  beforeAll(async () => {
    let firstConnection = await createConnection();

    const queryRunner = firstConnection.createQueryRunner();

    await queryRunner.query(`DROP database if exists plenosabor_test_itemlist`);

    await queryRunner.query(`create database plenosabor_test_itemlist`);

    await queryRunner.release();
    await firstConnection.destroy();

    testConnection = await createConnection("plenosabor_test_itemlist");

    await testConnection.runMigrations();
  });

  afterAll(async () => {
    await testConnection.destroy();
  });

  it("should be able to patch an itemList", async () => {
    const token = await createAndAuthenticateUser(
      "Marcelo",
      "12345",
      "marcelo@gmail.com"
    );

    const order = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send();

    const product = await createProduct(
      "Pizza de Shimeji",
      "Pizzas Salgadas",
      75.99,
      "Pizza com queijo e shimeji",
      token
    );

    const itemList = await request(app)
    .post(`/itemsList`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        order_id: order.body.data.order_id,
        product_id: product.product_id,
        quantity: 2,
        details: "sem azeitonas",
      });


    const operations = {
      operations: [{ op: "replace", path: "/quantity", value: 1 }],
    };

    const response = await request(app)
        .patch(`/itemsList/${itemList.body.data.itemList_id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(operations);

    console.log("response", response.body.data);

    expect(response.status).toBe(200);
  });
});
