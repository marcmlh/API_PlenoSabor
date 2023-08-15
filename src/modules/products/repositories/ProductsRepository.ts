import { Repository } from "typeorm";
import { dataSource } from "../../../database/data-source";
import { Products } from "../entities/Products";
import { IProductsRepository } from "./IProductsRepository";

export class ProductsRepository implements IProductsRepository {
  private repository: Repository<Products>;

  constructor() {
    this.repository = dataSource.getRepository(Products);
  }

  async create(
    product_name: string,
    category: string,
    price: number,
    description?: string | undefined
  ): Promise<Products> {
    const product = this.repository.create({
      product_name,
      category,
      price,
      description,
    });

    await this.repository.save(product);

    return product;
  }

  async findByName(product_name: string): Promise<Products> {
    const product = await this.repository.findOneBy({ product_name });
    return product;
  }

  async findById(product_id: string): Promise<Products> {
    const product = await this.repository.findOneBy({ product_id });
    return product;
  }

  async deleteByName(product_name): Promise<void> {
    await this.repository.delete({ product_name });
  }

  async patch({
    product_id,
    product_name,
    category,
    price,
    description}
  ): Promise<void> {
    const product = await this.repository.create({
      product_id,
      product_name,
      category,
      price,
      description,
    });

    await this.repository.update(product_id, product);
  }
}
