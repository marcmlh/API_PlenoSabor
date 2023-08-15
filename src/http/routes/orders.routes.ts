import { Router } from "express";
import { OrdersController } from "../OrdersController";
import { ensureAuthenticate } from "../../middlewares/ensureAuthenticate";

export const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.post("/", ensureAuthenticate, ordersController.create);

ordersRoutes.get("/", ensureAuthenticate, ordersController.findByUserId);

ordersRoutes.delete("/:order_id", ensureAuthenticate, ordersController.deleteById);

ordersRoutes.patch("/:order_id", ensureAuthenticate, ordersController.patch);