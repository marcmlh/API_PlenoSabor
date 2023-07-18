import { container } from "tsyringe";
import { ProductsRepository } from "../../modules/products/repositories/ProductsRepository";
import { UsersRepository } from "../../modules/users/repositories/UsersRepository";
import { OrdersRepository } from "../../modules/orders/repositories/OrdersRepository";
import { ItemsListRepository } from "../../modules/itemsList/repositories/ItemsListRepository";

container.registerSingleton<UsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ProductsRepository>(
  "ProductsRepository",
  ProductsRepository
);

container.registerSingleton<OrdersRepository>(
  "OrdersRepository",
  OrdersRepository
);

container.registerSingleton<ItemsListRepository>(
  "ItemsListRepository",
  ItemsListRepository
);