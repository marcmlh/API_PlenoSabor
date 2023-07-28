import { DefaultResponse } from "../../../global/DefaultResponse";
import { InMemoryProductsRepository } from "../../../test/inMemoryRepositories/in-memory-products-repository";
import { ProductsService } from "./ProductsService";

let productsRepository: InMemoryProductsRepository;
let sut: ProductsService;

describe("Create product", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    sut = new ProductsService(productsRepository);
  });

  it("should be able to create a product", async () => {
    let product = await sut.create(
      "Pizza de Atum com Cebolas",
      "Pizzas",
      57,
      "Pizza de atum com rodelas de cebola e azeitonas"
    );
    expect(product.product_name).toEqual("Pizza de Atum com Cebolas");
    expect(product.category).toEqual("Pizzas");
    expect(product.price).toEqual(57);
    expect(product.description).toEqual(
      "Pizza de atum com rodelas de cebola e azeitonas"
    );
    expect(productsRepository.items).length(1);
  });
  it("should not be able to create a product with the same name", async () => {
    await sut.create(
      "Pizza de Atum com Cebolas",
      "Pizzas",
      57,
      "Pizza de atum com rodelas de cebola e azeitonas"
    );

    expect(async () => {
      await sut.create(
        "Pizza de Atum com Cebolas",
        "Pizzas",
        60,
        "Pizza de atum com rodelas de cebola e azeitonas"
      );
    }).rejects.toBeInstanceOf(DefaultResponse);
  });
});

describe("Find product by name", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    sut = new ProductsService(productsRepository);
  });

  it("should be able to find a product by name", async () => {
    await sut.create(
      "Pizza de Atum com Cebolas",
      "Pizzas",
      57,
      "Pizza de atum com rodelas de cebola e azeitonas"
    );

    let product = await sut.findByName("Pizza de Atum com Cebolas");


    expect(product.product_name).toEqual("Pizza de Atum com Cebolas");
    expect(productsRepository.items).length(1);
  });
  it("should not be able to find a product with nonexist name", async () => {
    await sut.create(
      "Pizza de Atum com Cebolas",
      "Pizzas",
      57,
      "Pizza de atum com rodelas de cebola e azeitonas"
    );

    expect(async () => {
      await sut.findByName(
        "Pizza de Calabresa"
      );
    }).rejects.toBeInstanceOf(DefaultResponse);
  });
});

describe("Delete product", () => {
    beforeEach(() => {
      productsRepository = new InMemoryProductsRepository();
      sut = new ProductsService(productsRepository);
    });
  
    it("should be able to delete a product by name", async () => {
      await sut.create(
        "Pizza de Atum com Cebolas",
        "Pizzas",
        57,
        "Pizza de atum com rodelas de cebola e azeitonas"
      );
  
      await sut.deleteByName("Pizza de Atum com Cebolas");
  
  
      expect(productsRepository.items).length(0);
    });
    it("should not be able to delete a product with nonexist name", async () => {
      await sut.create(
        "Pizza de Atum com Cebolas",
        "Pizzas",
        57,
        "Pizza de atum com rodelas de cebola e azeitonas"
      );
  
      expect(async () => {
        await sut.deleteByName(
          "Pizza de Calabresa"
        );
      }).rejects.toBeInstanceOf(DefaultResponse);
    });
  });


  describe("Patch product", () => {
    beforeEach(() => {
      productsRepository = new InMemoryProductsRepository();
      sut = new ProductsService(productsRepository);
    });
  
    it("should be able to update part of a product", async () => {
      let product = await sut.create(
        "Pizza de Atum com Cebolas",
        "Pizzas",
        57,
        "Pizza de atum com rodelas de cebola e azeitonas"
      );

      let operations = [
        { "op": "replace", "path": "/price", "value": 50},
        { "op": "replace", "path": "/product_name", "value": "Pizza de Calabresa"},
      ]
      await sut.patch(product.product_id, operations)

      expect(productsRepository.items[0].price).toEqual(50);
      expect(productsRepository.items[0].product_name).toEqual("Pizza de Calabresa");
    });

    it("should not be able to patch a product with unonexist id", async () => {
      await sut.create(
        "Pizza de Atum com Cebolas",
        "Pizzas",
        57,
        "Pizza de atum com rodelas de cebola e azeitonas"
      );

      let operations = [
        { "op": "replace", "path": "/price", "value": 50},
        { "op": "replace", "path": "/product_name", "value": "Pizza de Calabresa"},
      ]
  
      expect(async () => {
        await sut.patch("jdi2jd92j3d9j2", operations);
      }).rejects.toBeInstanceOf(DefaultResponse);
    });
  });