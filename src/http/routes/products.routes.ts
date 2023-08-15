import { Router } from "express";
import { ProductsController } from "../ProductsController";
import { ensureAuthenticate } from "../../middlewares/ensureAuthenticate";

export const productsRoutes = Router();

const productsController = new ProductsController();

productsRoutes.post("/", ensureAuthenticate, productsController.create);

productsRoutes.get("/", productsController.findByName);

productsRoutes.delete("/", ensureAuthenticate, productsController.deleteByName);

productsRoutes.patch("/:product_id", ensureAuthenticate, productsController.patch);