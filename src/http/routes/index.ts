import { Router } from "express";
import { productsRoutes } from "./products.routes";
import { usersRoutes } from "./users.routes";
import { ordersRoutes } from "./orders.routes";
import { itemsListRoutes } from "./itemsList.routes";

export const routes = Router();

routes.use("/products", productsRoutes);

routes.use("/users", usersRoutes);

routes.use("/orders", ordersRoutes);

routes.use("/itemsList", itemsListRoutes);