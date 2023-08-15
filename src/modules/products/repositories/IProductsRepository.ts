import { Products } from "../entities/Products";

export interface IProductsRepository {
  create(
    product_name: string,
    category: string,
    price: number,
    description?: string  | undefined
  ): Promise<Products>;

  findByName(product_name: string): Promise<Products>;
  findById(product_id: string): Promise<Products>;
  deleteByName(product_name): Promise<void>;
  patch({
    product_id,
    product_name,
    category,
    price,
    description,
  }): Promise<void>;
}
