import { Request, Response } from "express";
import { container } from "tsyringe";
import { ItemsListService } from "../modules/itemsList/services/ItemsListService";
import { DefaultResponse } from "../global/DefaultResponse";
import { z } from "zod";

export class ItemsListController {
  async create(request: Request, response: Response): Promise<Response> {
    const createObject = z.object({
      order_id: z.string(),
      product_id: z.string(),
      quantity: z.number(),
      details: z.string().optional()
    });

    const { order_id, product_id, quantity, details } = createObject.parse(request.body);

    const itemsListService = container.resolve(ItemsListService);

    const itemList = await itemsListService.create(order_id, product_id, quantity, details);

    return response.status(201).json(new DefaultResponse(itemList, true, 201));
  }

  async findByOrderId(request: Request, response: Response): Promise<Response> {
    const requestObject = z.object({
      order_id: z.string(),
    });

    const { order_id } = requestObject.parse(request.query);

    const itemsListService = container.resolve(ItemsListService);

    const items = await itemsListService.findByOrderId(order_id);

    return response.status(200).json(new DefaultResponse(items, true, 200));
  }

  async deleteByItemListId(
    request: Request,
    response: Response
  ): Promise<Response> {
    const requestObject = z.object({
      itemList_id: z.string(),
    });

    const { itemList_id } = requestObject.parse(request.query);

    const itemsListService = container.resolve(ItemsListService);

    await itemsListService.deleteByItemListId(itemList_id);

    return response.status(200).json(new DefaultResponse("Delete sucessfully.", true, 200));
  }

  async patch(request: Request, response: Response): Promise<Response> {
    const { itemList_id } = request.params;
    const { operations } = request.body;

    const itemsListService = container.resolve(ItemsListService);

    const itemPatched = await itemsListService.patch(itemList_id, operations);

    return response
      .status(200)
      .json(new DefaultResponse(itemPatched, true, 200));
  }
}
