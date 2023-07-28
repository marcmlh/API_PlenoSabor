import { Orders } from "../../modules/orders/entities/Order";
import { InMemoryOrdersRepository } from "../inMemoryRepositories/in-memory-orders-repository";

export function createOrderInMemory(user_id: string): Promise<Orders> {
  const ordersRepository = new InMemoryOrdersRepository();

  let order = ordersRepository.create(user_id);

  return order;
}
