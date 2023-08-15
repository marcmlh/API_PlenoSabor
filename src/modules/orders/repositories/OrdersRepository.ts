import { Repository } from "typeorm";
import { Orders } from "../entities/Order";
import { dataSource } from "../../../database/data-source";
import { IOrdersRepository } from "./IOrdersRepository";

export class OrdersRepository implements IOrdersRepository{
  private repository: Repository<Orders>;

  constructor() {
    this.repository = dataSource.getRepository(Orders);
  }

  async create(user_id: string): Promise<Orders> {
    const order = this.repository.create({
      user_id
    });

    await this.repository.save(order);

    return order;
  }

  async deleteById(order_id: string): Promise<void> {
    await this.repository.delete({ order_id });
  }

  async findByUserId(user_id: string): Promise<Orders[]> {
    const orders = await this.repository.find({
      where: {
        user_id,
      },
    });

    return orders;
  }

  async findById(order_id: string): Promise<Orders> {
    const order = await this.repository.findOneBy({ order_id });
    return order;
  }

  async patch({
    order_id,
    user_id,
    order_date,
    payment_status,
  }): Promise<void> {
    const order = await this.repository.create({
      order_id,
      user_id,
      order_date,
      payment_status,
    });

    await this.repository.update(order_id, order);
  }
}
