import { DefaultResponse } from "../../../global/DefaultResponse";
import { InMemoryOrdersRepository } from "../../../test/inMemoryRepositories/in-memory-orders-repository";
import { createUserInMemory } from "../../../test/utils/createUserInMemory"
import { Orders } from "../entities/Order";
import { OrdersService } from "./OrdersService";

let ordersRepository: InMemoryOrdersRepository;
let sut: OrdersService;

describe("Create Order", () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository();
    sut = new OrdersService(ordersRepository);
  });

  it("should be able to create a new order", async () => {
    let user = await createUserInMemory(
      "Marquelo",
      "12345",
      "marquelo@gmail.com"
    );

    let order = await sut.create(user.user_id);

    expect(ordersRepository.items).length(1);
    expect(order.payment_status).toEqual(false);
  });

});

describe("Delete Order", () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository();
    sut = new OrdersService(ordersRepository);
  });

  it("should be able to delete an order", async () => {
    let user = await createUserInMemory(
      "Marquelo",
      "12345",
      "marquelo@gmail.com"
    );

    let order = await sut.create(user.user_id);

    await sut.deleteById(order.order_id);

    expect(ordersRepository.items.length).toEqual(0);
  });

  it("should not be able to delete an order with an unonexisting id", async () => {
    let user = await createUserInMemory(
      "Marquelo",
      "12345",
      "marquelo@gmail.com"
    );
    await sut.create(user.user_id);
    expect(async () => {
      await sut.deleteById("jdi2jd92j3d9j2");
    }).rejects.toBeInstanceOf(DefaultResponse);
  });
});

describe("Find Order", () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository();
    sut = new OrdersService(ordersRepository);
  });
  it("should be able to find an order with an order id", async () => {
    let user = await createUserInMemory(
      "Marquelo",
      "12345",
      "marquelo@gmail.com"
    );
    let order = await sut.create(user.user_id);
    let orderFound = await sut.findById(order.order_id);

    expect(orderFound).toEqual(order);
  });

  it("should not be able to find an order with an unonexisting order id", async () => {
    let user = await createUserInMemory(
      "Marquelo",
      "12345",
      "marquelo@gmail.com"
    );
    await sut.create(user.user_id);

    expect(async () => {
      await sut.findById("jdi2jd92j3d9j2");
    }).rejects.toBeInstanceOf(DefaultResponse);
  });
});

describe("Find Orders by User Id", () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository();
    sut = new OrdersService(ordersRepository);
  });

  it("should be able to find user's orders", async () => {
    let user = await createUserInMemory(
      "Marquelo",
      "12345",
      "marquelo@gmail.com"
    );
    let order = await sut.create(user.user_id);

    let ordersFound = await sut.findByUserId(user.user_id);

    expect(ordersFound[0]).toEqual(order);
  });
});

describe("Patch Order ", () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository();
    sut = new OrdersService(ordersRepository);
  });
  
  it("should be able to patch an order", async () => {
    let user = await createUserInMemory(
      "Marquelo",
      "12345",
      "marquelo@gmail.com"
    );
    let order = await sut.create(user.user_id);

    let operations = [{ op: "replace", path: "/payment_status", value: true }];

    let orderPatched = await sut.patch(order.order_id, operations);

    expect(orderPatched.payment_status).toEqual(true);
  });

  it("should not be able to patch an order with an unonexisting order id", async () => {
    let user = await createUserInMemory("Marquelo", "12345", "marquelo@gmail.com");
    await sut.create(user.user_id);

    let operations = [{ op: "replace", path: "/payment_status", value: true }];

    expect(async () => {
      await sut.patch("jdi2jd92j3d9j2", operations);
    }).rejects.toBeInstanceOf(DefaultResponse);
  });
});
