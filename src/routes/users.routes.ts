import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { UsersController } from "../modules/users/controllers/UsersController";

export const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);

usersRoutes.get(
  "/findByEmail",
  ensureAuthenticate,
  usersController.findByEmail
);

usersRoutes.delete(
  "/deleteByEmail",
  ensureAuthenticate,
  usersController.deleteByEmail
);

usersRoutes.put("/:user_id/", ensureAuthenticate, usersController.update);

usersRoutes.post("/authenticate", usersController.authenticate);
