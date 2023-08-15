import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";
import { DefaultResponse } from "./global/DefaultResponse";
import { ZodError } from "zod";
import { createConnection } from "./database/data-source";
import "express-async-errors";
import "./database/data-source";
import "./global/tsyringeContainer"
import { routes } from "./http/routes";

export const app = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.use((error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof DefaultResponse) {
    return response.status(error.status).json(error);
  }

  if (error instanceof ZodError) {
    return response.status(400).json(error.format());
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error: ${error.message}`,
  });
});

createConnection();