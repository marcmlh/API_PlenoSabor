import { Orders } from "../entities/Order";

export interface IOrdersRepository {
  create(user_id: string): Promise<Orders>;
  deleteById(order_id: string): Promise<void>;
  findByUserId(user_id: string): Promise<Orders[]>;
  findById(order_id: string): Promise<Orders>;
  patch({ order_id, user_id, order_date, payment_status }): Promise<void>;
}
