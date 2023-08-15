import "reflect-metadata"
import { inject, injectable } from "tsyringe";
import { Products } from "../entities/Products";
import { DefaultResponse } from "../../../global/DefaultResponse";
import jsonpatch from "jsonpatch";
import { IProductsRepository } from "../repositories/IProductsRepository";

@injectable()
export class ProductsService {
  constructor(
    @inject("ProductsRepository") private productsRepository: IProductsRepository
  ) {}

  async create(
    product_name: string,
    category: string,
    price: number,
    description?: string | undefined
  ): Promise<Products> {
    const productAlreadyExists = await this.productsRepository.findByName(
      product_name
    );
    if (productAlreadyExists) {
      throw new DefaultResponse("This product already exists.", false, 400);
    }

    const product = await this.productsRepository.create(
      product_name,
      category,
      price,
      description
    );

    return product;
  }

  async findByName(product_name: string): Promise<Products> {
    const product = await this.productsRepository.findByName(product_name);

    if (!product) {
      throw new DefaultResponse("Product not found.", false, 400);
    }

    return product;
  }

  async deleteByName(product_name: string): Promise<void> {
    const productExists = await this.productsRepository.findByName(
      product_name
    );

    if (!productExists) {
      throw new DefaultResponse("Product not found.", false, 400);
    }

    await this.productsRepository.deleteByName(product_name);
  }

  async patch(product_id: string, operations: any[]): Promise<Products> {
    const productExists = await this.productsRepository.findById(product_id);
    if (!productExists) {
      throw new DefaultResponse("Product not found.", false, 400);
    }

    const patchedProduct = jsonpatch.apply_patch(productExists, operations);

    await this.productsRepository.patch(patchedProduct);

    return patchedProduct;
  }
}
