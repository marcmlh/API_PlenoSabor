import { DefaultResponse } from "../../../global/DefaultResponse";
import { InMemoryItemsListRepository } from "../../../test/inMemoryRepositories/in-memory-itemsList-repository";
import { InMemoryProductsRepository } from "../../../test/inMemoryRepositories/in-memory-products-repository";
import { createOrderInMemory } from "../../../test/utils/createOrderInMemory";
import { createUserInMemory } from "../../../test/utils/createUserInMemory";
import { ItemsListService } from "./ItemsListService";

let itemsListRepository: InMemoryItemsListRepository;
let productsRepository: InMemoryProductsRepository;
let sut: ItemsListService;

describe("Create ItemList", () => {
  beforeEach(() => {
    itemsListRepository = new InMemoryItemsListRepository();
    productsRepository = new InMemoryProductsRepository();
    sut = new ItemsListService(itemsListRepository, productsRepository);
  });

  it("should be able to create a new item list", async () => {
    let user = await createUserInMemory(
      "Marquelo",
      "12345",
      "marquelo@gmail.com"
    );

    let order = await createOrderInMemory(user.user_id);

    const product = await productsRepository.create(
      "Pizza de Atum com Cebolas",
      "Pizzas",
      57,
      "Pizza de atum com rodelas de cebola e azeitonas"
    );

    let itemList = await sut.create(
      order.order_id,
      product.product_id,
      2,
      "sem cebola"
    );

    expect(itemsListRepository.items[0]).toEqual(itemList);
    expect(itemList.total).toEqual(2 * 57);
  });

  it("should be able to add items that already exists in an order", async () => {
    let user = await createUserInMemory(
      "Marquelo",
      "12345",
      "marquelo@gmail.com"
    );

    let order = await createOrderInMemory(user.user_id);

    const product = await productsRepository.create(
      "Pizza de Atum com Cebolas",
      "Pizzas",
      57,
      "Pizza de atum com rodelas de cebola e azeitonas"
    );

    let itemList = await sut.create(
      order.order_id,
      product.product_id,
      2,
      "sem cebola"
    );

    let itemListAdded = await sut.create(order.order_id, product.product_id, 3,"sem cebola");

    expect(itemsListRepository.items[0]).toEqual(itemList);
    expect(itemListAdded.total).toEqual(5 * 57);
  });
});

describe("Find ItemsList", () => {
  beforeEach(() => {
    itemsListRepository = new InMemoryItemsListRepository();
    productsRepository = new InMemoryProductsRepository();
    sut = new ItemsListService(itemsListRepository, productsRepository);
  });

  it("should be able to find all items from an order", async () => {
    let user = await createUserInMemory(
      "Marquelo",
      "12345",
      "marquelo@gmail.com"
    );

    let order = await createOrderInMemory(user.user_id);

    await productsRepository.create(
      "Pizza de Atum com Cebolas",
      "Pizzas",
      57,
      "Pizza de atum com rodelas de cebola e azeitonas"
    );

    let itemList = await sut.findByOrderId(order.order_id);

    expect(itemsListRepository.items).toEqual(itemList);
  });

});

describe("Delete ItemsList", () => {
  beforeEach(() => {
    itemsListRepository = new InMemoryItemsListRepository();
    productsRepository = new InMemoryProductsRepository();
    sut = new ItemsListService(itemsListRepository, productsRepository);
  });

  it("should be able to delete an item from an order", async () => {
    let user = await createUserInMemory(
      "Marquelo",
      "12345",
      "marquelo@gmail.com"
    );

    let order = await createOrderInMemory(user.user_id);

    let product = await productsRepository.create(
      "Pizza de Atum com Cebolas",
      "Pizzas",
      57,
      "Pizza de atum com rodelas de cebola e azeitonas"
    );

    let itemList = await sut.create(
      order.order_id,
      product.product_id,
      2,
      "sem cebola"
    );

    await sut.deleteByItemListId(itemList.itemList_id)

    expect(itemsListRepository.items).length(0);
  });

  it("should not be able to delete items with an unonexistent itemList id", async () => {
    let user = await createUserInMemory(
      "Marquelo",
      "12345",
      "marquelo@gmail.com"
    );

    let order = await createOrderInMemory(user.user_id);

    let product = await productsRepository.create(
        "Pizza de Atum com Cebolas",
        "Pizzas",
        57,
        "Pizza de atum com rodelas de cebola e azeitonas"
      );
  
      await sut.create(
        order.order_id,
        product.product_id,
        2,
        "sem cebola"
      );

    expect(async () => {
      await sut.deleteByItemListId("dsahidasihjdihasidhias");
    }).rejects.toBeInstanceOf(DefaultResponse);
  });
});

describe("Patch ItemsList", () => {
    beforeEach(() => {
      itemsListRepository = new InMemoryItemsListRepository();
      productsRepository = new InMemoryProductsRepository();
      sut = new ItemsListService(itemsListRepository, productsRepository);
    });
  
    it("should be able to patch an item from an order", async () => {
      let user = await createUserInMemory(
        "Marquelo",
        "12345",
        "marquelo@gmail.com"
      );
  
      let order = await createOrderInMemory(user.user_id);
  
      let product = await productsRepository.create(
        "Pizza de Atum com Cebolas",
        "Pizzas",
        57,
        "Pizza de atum com rodelas de cebola e azeitonas"
      );
  
      let itemList = await sut.create(
        order.order_id,
        product.product_id,
        2,
        "sem cebola"
      );
  
      let operations = [
        { "op": "replace", "path": "/quantity", "value": 1},
        { "op": "replace", "path": "/details", "value": "sem azeitonas"}
      ]


      let itemListPatched = await sut.patch(itemList.itemList_id, operations);
  
      expect(itemsListRepository.items[0]).toEqual(itemListPatched);
    });
  
    it("should not be able to delete items with an unonexistent itemList id", async () => {
      let user = await createUserInMemory(
        "Marquelo",
        "12345",
        "marquelo@gmail.com"
      );
  
      let order = await createOrderInMemory(user.user_id);
  
      let product = await productsRepository.create(
          "Pizza de Atum com Cebolas",
          "Pizzas",
          57,
          "Pizza de atum com rodelas de cebola e azeitonas"
        );
    
      await sut.create(
          order.order_id,
          product.product_id,
          2,
          "sem cebola"
        );

        let operations = [
            { "op": "replace", "path": "/quantity", "value": 1},
          ]
  
      expect(async () => {
        await sut.patch("dsahidasihjdihasidhias", operations);
      }).rejects.toBeInstanceOf(DefaultResponse);
    });
  });

