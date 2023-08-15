import { Router } from "express";
import { ensureAuthenticate } from "../../middlewares/ensureAuthenticate";
import { ItemsListController } from "../ItemsListController";

export const itemsListRoutes = Router();

const itemsListController = new ItemsListController();

itemsListRoutes.post("/", ensureAuthenticate, itemsListController.create);

itemsListRoutes.get(
  "/",
  ensureAuthenticate,
  itemsListController.findByOrderId
);

itemsListRoutes.delete(
  "/",
  ensureAuthenticate,
  itemsListController.deleteByItemListId
);

itemsListRoutes.patch("/:itemList_id", ensureAuthenticate, itemsListController.patch);
