import { Router } from "express";
import { ProductsController } from "../modules/products/controllers/ProductsController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

export const productsRoutes = Router();

const productsController = new ProductsController();

productsRoutes.post("/", ensureAuthenticate, productsController.create);

productsRoutes.get("/findByName", ensureAuthenticate, productsController.findByName);

productsRoutes.delete("/deleteByName", ensureAuthenticate, productsController.deleteByName);

productsRoutes.patch("/:product_id", ensureAuthenticate, productsController.patch);