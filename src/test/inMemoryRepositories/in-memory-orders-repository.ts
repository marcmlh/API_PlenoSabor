import { v4 as uuidV4 } from "uuid";
import { Orders } from "../../modules/orders/entities/Order";
import { IOrdersRepository } from "../../modules/orders/repositories/IOrdersRepository";

export class InMemoryOrdersRepository implements IOrdersRepository {
  public items: Orders[] = [];

  async create(user_id: string): Promise<Orders> {
    let order: Orders = {
      order_id: uuidV4(),
      order_date: new Date(),
      user_id,
      payment_status: false,
    };

    this.items.push(order);

    return order;
  }

  async deleteById(order_id: string): Promise<void> {
    const order = this.items.filter((item) => item.order_id !== order_id);

    this.items = order;
  }

  async findByUserId(user_id: string): Promise<Orders[]> {
    return this.items.filter((order) => order.user_id === user_id);
  }

  async findById(order_id: string): Promise<Orders> {
    return this.items.find((order) => order.order_id === order_id);
  }

  async patch({
    order_id,
    user_id,
    order_date,
    payment_status,
  }): Promise<void> {
    let orders = this.items.map((order) => {
      if (order.order_id === order_id) {
        (order.user_id = user_id),
          (order.order_date = order_date),
          (order.payment_status = payment_status);
      }
      return order;
    });

    this.items = orders;
  }
}
