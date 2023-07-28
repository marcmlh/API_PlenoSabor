import "reflect-metadata"
import { inject, injectable } from "tsyringe";
import { Users } from "../entities/Users";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { DefaultResponse } from "../../../global/DefaultResponse";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
export class UsersService {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async create(
    user_name: string,
    password: string,
    email: string
  ): Promise<Users> {
    const hashPassword = await hash(password, 8);

    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new DefaultResponse("Email already in use.", false, 400);
    }

    const user = await this.usersRepository.create(
      user_name,
      hashPassword,
      email
    );

    return user;
  }

  async findByEmail(email: string): Promise<Users> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new DefaultResponse("Email not found.", false, 400);
    }
    return user;
  }

  async deleteByEmail(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new DefaultResponse("Email not found.", false, 400);
    }

    await this.usersRepository.deleteByEmail(email);
  }

  async update(
    user_id: string,
    user_name: string,
    password: string,
    email: string
  ): Promise<Users> {
    const hashPassword = await hash(password, 8);

    const userExists = await this.usersRepository.findById(user_id);
    if (!userExists) {
      throw new DefaultResponse("User not found.", false, 400);
    }

    const user = await this.usersRepository.update(
      user_id,
      user_name,
      hashPassword,
      email
    );

    return user;
  }

  async authenticate(email: string, password: string) {
    const userExists = await this.usersRepository.findByEmail(email);
    if (!userExists) {
      throw new DefaultResponse("User not found.", false, 400);
    }

    const passwordMatches = await compare(password, userExists.password);

    if (!passwordMatches) {
      throw new DefaultResponse("Incorrect e-mail or password", false, 401);
    }

    const token = sign(
      { user_name: userExists.user_name, email: userExists.email },
      "marceloabcde1234",
      {
        subject: userExists.user_id,
        expiresIn: "1d",
      }
    );

    const response = {
      user: {
        user_name: userExists.user_name,
        email: userExists.email,
      },
      token,
    };

    return response;
  }
}
