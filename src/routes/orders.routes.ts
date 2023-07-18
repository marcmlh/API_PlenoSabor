import { Router } from "express";
import { OrdersController } from "../modules/orders/controllers/OrdersController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

export const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.post("/", ensureAuthenticate, ordersController.create);

ordersRoutes.get("/findByUserId/:user_id", ensureAuthenticate, ordersController.findByUserId);

ordersRoutes.delete("/deleteById/:order_id", ensureAuthenticate, ordersController.deleteById);

ordersRoutes.patch("/:order_id", ensureAuthenticate, ordersController.patch);