import { Products } from "../../modules/products/entities/Products";
import { v4 as uuidV4 } from "uuid";
import { IProductsRepository } from "../../modules/products/repositories/IProductsRepository";

export class InMemoryProductsRepository implements IProductsRepository {
  public items: Products[] = [];

  async create(
    product_name: string,
    category: string,
    price: number,
    description: string
  ): Promise<Products> {
    let product: Products = {
      product_id: uuidV4(),
      product_name,
      category,
      price,
      description,
    };

    this.items.push(product);

    return product;
  }

  async findByName(product_name: string): Promise<Products> {
    return this.items.find((product) => product.product_name === product_name);
  }

  async findById(product_id: string): Promise<Products> {
    return this.items.find((product) => product.product_id === product_id);
  }

  async deleteByName(product_name): Promise<void> {
    const product = this.items.filter(
      (product) => product.product_name !== product_name
    );

    this.items = product;
  }

  async patch({
    product_id,
    product_name,
    category,
    price,
    description,
  }): Promise<void> {
    let products = this.items.map((product) => {
      if (product.product_id === product_id) {
        (product.product_name = product_name),
          (product.category = category),
          (product.price = price);
        product.description = description;
      }

      return product;
    });

    this.items = products;
  }
}
