import { Router } from "express";
import { ensureAuthenticate } from "../../middlewares/ensureAuthenticate";
import { UsersController } from "../UsersController";

export const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);

usersRoutes.get(
  "/",
  ensureAuthenticate,
  usersController.findByEmail
);

usersRoutes.delete(
  "/",
  ensureAuthenticate,
  usersController.deleteByEmail
);

usersRoutes.put(
  "/",
  ensureAuthenticate,
  usersController.update
);

usersRoutes.post("/authenticate", usersController.authenticate);
