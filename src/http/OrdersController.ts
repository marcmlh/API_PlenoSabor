import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { OrdersService } from "../modules/orders/services/OrdersService";
import { DefaultResponse } from "../global/DefaultResponse";

export class OrdersController {
  async create(request: Request, response: Response): Promise<Response> {
    const ordersService = container.resolve(OrdersService);

    const order = await ordersService.create(request.user_id);

    return response.status(201).json(new DefaultResponse(order, true, 201));
  }

  async findByUserId(request: Request, response: Response): Promise<Response> {
    const ordersService = container.resolve(OrdersService);

    const orders = await ordersService.findByUserId(request.user_id);

    return response.status(200).json(new DefaultResponse(orders, true, 200));
  }

  async deleteById(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.params
    const ordersService = container.resolve(OrdersService);
    await ordersService.deleteById(order_id);

    return response
      .status(200)
      .json(new DefaultResponse("Order was successfully deleted", true, 200));
  }

  async patch(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.params;

    const { operations } = request.body;

    const ordersService = container.resolve(OrdersService);

    const order = await ordersService.patch(order_id, operations);

    return response.status(200).json(new DefaultResponse(order, true, 200));
  }
}
