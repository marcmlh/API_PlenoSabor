import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ItemsListController } from "../modules/itemsList/controllers/ItemsListController";

export const itemsListRoutes = Router();

const itemsListController = new ItemsListController();

itemsListRoutes.post("/", ensureAuthenticate, itemsListController.create);

itemsListRoutes.get(
  "/findByOrderId",
  ensureAuthenticate,
  itemsListController.findByOrderId
);

itemsListRoutes.delete(
  "/deleteByItemListId",
  ensureAuthenticate,
  itemsListController.deleteByItemListId
);

itemsListRoutes.patch("/patch/:itemList_id", ensureAuthenticate, itemsListController.patch);
