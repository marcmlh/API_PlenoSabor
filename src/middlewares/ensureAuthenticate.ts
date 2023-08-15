import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { DefaultResponse } from "../global/DefaultResponse";
import { UsersRepository } from "../modules/users/repositories/UsersRepository";

export async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken || authToken == "") {
    throw new DefaultResponse("Token is missing", false, 401);
  }

  const [, token] = authToken.split(" ");

  try {
    /* @ts-ignore */
    const { sub, email } = verify(token, "marceloabcde1234");

    const usersRepository = new UsersRepository();
    const account = await usersRepository.findById(sub.toString());

    if (!account) {
      throw new DefaultResponse("User not found!", false, 401);
    }

    /* @ts-ignore */
    request.user_id = sub.toString();
    /* @ts-ignore */
    request.email = email;

    next();
  } catch (error) {
    throw new DefaultResponse("Validation failed!", false, 401);
  }
}
