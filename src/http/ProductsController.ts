import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { DefaultResponse } from "../global/DefaultResponse";
import { ProductsService } from "../modules/products/services/ProductsService";

export class ProductsController {
  async create(request: Request, response: Response): Promise<Response> {
    const createObject = z.object({
      product_name: z.string(),
      category: z.enum([
        "Pizzas Salgadas",
        "Pizzas Doces",
        "Esfihas Salgadas",
        "Esfihas Doces",
        "Bebidas",
      ]),
      price: z.number(),
      description: z.string().optional()
    });

    const { product_name, category, price, description } = createObject.parse(
      request.body
    );

    const productsService = container.resolve(ProductsService);

    const product = await productsService.create(
      product_name,
      category,
      price,
      description
    );

    return response.status(201).json(new DefaultResponse(product, true, 201));
  }

  async findByName(request: Request, response: Response): Promise<Response> {
    const requestObject = z.object({
      product_name: z.string(),
    });

    const { product_name } = requestObject.parse(request.query);

    const productsService = container.resolve(ProductsService);

    const product = await productsService.findByName(product_name.toString());

    return response.status(200).json(new DefaultResponse(product, true, 200));
  }

  async deleteByName(request: Request, response: Response): Promise<Response> {
    const deleteObject = z.object({
      product_name: z.string(),
    });

    const { product_name } = deleteObject.parse(request.query);

    const productsService = container.resolve(ProductsService);

    await productsService.deleteByName(product_name);

    return response
      .status(200)
      .json(new DefaultResponse("Product was successfully deleted", true, 200));
  }

  async patch(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;

    const { operations } = request.body;

    const productsService = container.resolve(ProductsService);

    const productPatched = await productsService.patch(product_id, operations);

    return response
      .status(200)
      .json(new DefaultResponse(productPatched, true, 200));
  }
}
