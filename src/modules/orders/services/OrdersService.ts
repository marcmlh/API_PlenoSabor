import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { Orders } from "../entities/Order";
import jsonpatch from "jsonpatch";
import { DefaultResponse } from "../../../global/DefaultResponse";
import { IOrdersRepository } from "../repositories/IOrdersRepository";

@injectable()
export class OrdersService {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository
  ) {}

  async create(user_id: string): Promise<Orders> {
    const order = await this.ordersRepository.create(user_id);

    return order;
  }

  async deleteById(order_id: string): Promise<void> {
    const orderExists = await this.ordersRepository.findById(order_id);
    if (!orderExists) {
      throw new DefaultResponse("Order not found", false, 400);
    }

    await this.ordersRepository.deleteById(order_id);
  }

  async findById(order_id: string): Promise<Orders> {
    const order = await this.ordersRepository.findById(order_id);

    if (!order) {
      throw new DefaultResponse("Order not found.", false, 400);
    }

    return order;
  }

  async findByUserId(user_id: string): Promise<Orders[]> {
    const orders = await this.ordersRepository.findByUserId(user_id);

    return orders;
  }

  async patch(order_id: string, operations: any[]): Promise<Orders> {
    const orderExists = await this.ordersRepository.findById(order_id);

    if (!orderExists) {
      throw new DefaultResponse("Order not found.", false, 400);
    }

    const patchedOrder = jsonpatch.apply_patch(orderExists, operations);

    await this.ordersRepository.patch(patchedOrder);

    return patchedOrder;
  }
}
