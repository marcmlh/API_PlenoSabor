import { Request, Response } from "express";
import { container } from "tsyringe";
import { UsersService } from "../modules/users/services/UsersService";
import { DefaultResponse } from "../global/DefaultResponse";


export class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { user_name, password, email } = request.body;

    const usersService = container.resolve(UsersService);

    const user = await usersService.create(user_name, password, email);

    return response.status(201).json(new DefaultResponse(user, true, 201));
  }

  async findByEmail(request: Request, response: Response): Promise<Response> {
    const { email } = request.query;

    const usersService = container.resolve(UsersService);

    const user = await usersService.findByEmail(email?.toString());

    return response.status(200).json(new DefaultResponse(user, true, 200));
  }

  async deleteByEmail(request: Request, response: Response): Promise<Response> {
    const { email } = request.query;

    const usersService = container.resolve(UsersService);

    await usersService.deleteByEmail(email?.toString());

    return response
      .status(200)
      .json(new DefaultResponse("User was successfully deleted", true, 200));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { user_name, password, email } = request.body;

    const usersService = container.resolve(UsersService);

    const user = await usersService.update(request.user_id, user_name, password, email);

    return response.status(200).json(new DefaultResponse(user, true, 200));
  }

  async authenticate(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const usersService = container.resolve(UsersService);

    const user = await usersService.authenticate(email, password);

    return response.status(200).json(new DefaultResponse(user, true, 200));
  }
}
